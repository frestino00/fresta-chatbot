import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, User, Loader2, FileText, X, Volume2, VolumeX, StopCircle, Trash2, Menu, Sparkles, MapPin, Beaker, GraduationCap } from 'lucide-react';
import { Chat } from "@google/genai";
import { createSchoolChat, generateSpeech } from '../services/geminiService';
import { Message, Role } from '../types';

// Helper to read file as base64
const readFileBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:application/pdf;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Audio helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface ChatInterfaceProps {
  isDarkMode: boolean;
  externalMessage?: string | null;
  onExternalMessageHandled?: () => void;
  onToggleSidebar?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ isDarkMode, externalMessage, onExternalMessageHandled, onToggleSidebar }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: Role.MODEL,
      text: "Ciao! 👋 Sono il tuo assistente virtuale per l'ISIS G.D. Romagnosi. \n\nPosso aiutarti a scoprire i nostri indirizzi, i laboratori e le attività extrascolastiche. Di cosa vuoi parlare?",
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [chatInstance, setChatInstance] = useState<Chat | null>(null);
  
  // Context file state
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  // Audio state
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [loadingAudioId, setLoadingAudioId] = useState<string | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioCache = useRef<Map<string, AudioBuffer>>(new Map());
  const isAutoPlayRef = useRef(isAutoPlay);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const AVATAR_URL = "https://20.gdromagnosi.it/img/xtra/logo.png";

  // Quick Action Cards Data
  const quickActions = [
    { icon: <GraduationCap size={20} />, text: "Indirizzi di Studio", prompt: "Quali indirizzi di studio ci sono?", color: "from-blue-500 to-cyan-500" },
    { icon: <Beaker size={20} />, text: "Laboratori", prompt: "Come sono i laboratori della scuola?", color: "from-purple-500 to-pink-500" },
    { icon: <MapPin size={20} />, text: "Dove Siamo", prompt: "Dove si trovano le sedi della scuola?", color: "from-emerald-500 to-teal-500" },
    { icon: <Sparkles size={20} />, text: "Progetti Speciali", prompt: "Quali progetti extrascolastici fate?", color: "from-amber-500 to-orange-500" },
  ];

  // Sync ref
  useEffect(() => {
    isAutoPlayRef.current = isAutoPlay;
  }, [isAutoPlay]);

  // Initialize chat
  useEffect(() => {
    const chat = createSchoolChat();
    setChatInstance(chat);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Handle external messages (FAQ clicks)
  useEffect(() => {
    if (externalMessage && !isThinking && chatInstance) {
        handleSendMessage(undefined, externalMessage);
        if (onExternalMessageHandled) {
            onExternalMessageHandled();
        }
    }
  }, [externalMessage, isThinking, chatInstance]);

  // Cleanup audio context on unmount
  useEffect(() => {
    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setAttachedFile(file);
      } else {
        alert("Per favore seleziona un file PDF.");
      }
    }
  };

  const clearFile = () => {
    setAttachedFile(null);
  };

  const handlePlayAudio = async (messageId: string, text: string) => {
    // If clicking the currently playing message, stop it
    if (playingMessageId === messageId) {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }
      setPlayingMessageId(null);
      return;
    }

    // Stop any other playing message
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      setPlayingMessageId(null);
    }

    try {
      setLoadingAudioId(messageId);

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;

      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // Check cache first
      let buffer = audioCache.current.get(messageId);

      if (!buffer) {
          const base64Audio = await generateSpeech(text);
          let audioBytes = decode(base64Audio);
          
          // Safety: Int16Array requires even byte length
          if (audioBytes.length % 2 !== 0) {
            audioBytes = audioBytes.subarray(0, audioBytes.length - 1);
          }

          buffer = await decodeAudioData(audioBytes, ctx, 24000, 1);
          audioCache.current.set(messageId, buffer);
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      
      source.onended = () => {
        setPlayingMessageId(null);
        audioSourceRef.current = null;
      };

      audioSourceRef.current = source;
      source.start();
      setPlayingMessageId(messageId);

    } catch (err) {
      console.error("Error playing audio:", err);
    } finally {
      setLoadingAudioId(null);
    }
  };

  const handleClearChat = () => {
    setMessages([{
      id: 'welcome',
      role: Role.MODEL,
      text: "Chat resettata! 👋 \nCome posso aiutarti ora?",
      timestamp: Date.now()
    }]);
    audioCache.current.clear();
    setChatInstance(createSchoolChat());
  };

  const handleSendMessage = async (e?: React.FormEvent, overrideText?: string) => {
    e?.preventDefault();
    
    const textToSend = overrideText || inputValue.trim();

    if ((!textToSend && !attachedFile) || !chatInstance || isThinking) return;

    const tempFile = attachedFile;
    
    if (!overrideText) {
        setInputValue('');
    }
    setAttachedFile(null);

    const newMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: textToSend || (tempFile ? `Inviato file: ${tempFile.name}` : ''),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMessage]);
    setIsThinking(true);

    try {
      let responseText = "";
      
      if (tempFile) {
        const base64 = await readFileBase64(tempFile);
        const result = await chatInstance.sendMessageStream({
          message: [
            { inlineData: { mimeType: 'application/pdf', data: base64 } },
            { text: textToSend || "Ecco un documento aggiuntivo. Usalo per rispondere." }
          ]
        });
        
        for await (const chunk of result) {
            const text = chunk.text;
            if (text) {
                responseText += text;
                setMessages(prev => {
                    const last = prev[prev.length - 1];
                    if (last.role === Role.MODEL && last.id === 'temp-response') {
                         return [...prev.slice(0, -1), { ...last, text: responseText }];
                    } else {
                         return [...prev, { id: 'temp-response', role: Role.MODEL, text: responseText, timestamp: Date.now() }];
                    }
                });
            }
        }
      } else {
         const result = await chatInstance.sendMessageStream({ message: textToSend });
         for await (const chunk of result) {
            const text = chunk.text;
            if (text) {
                responseText += text;
                setMessages(prev => {
                    const last = prev[prev.length - 1];
                    if (last.role === Role.MODEL && last.id === 'temp-response') {
                         return [...prev.slice(0, -1), { ...last, text: responseText }];
                    } else {
                         return [...prev, { id: 'temp-response', role: Role.MODEL, text: responseText, timestamp: Date.now() }];
                    }
                });
            }
         }
      }
      
      const finalId = Date.now().toString();
      setMessages(prev => prev.map(msg => msg.id === 'temp-response' ? { ...msg, id: finalId } : msg));

      if (isAutoPlayRef.current && responseText) {
          setTimeout(() => {
              handlePlayAudio(finalId, responseText);
          }, 100);
      }

    } catch (error) {
       console.error(error);
       setMessages(prev => [...prev, {
           id: Date.now().toString(),
           role: Role.MODEL,
           text: "Scusa, ho avuto un piccolo problema tecnico. Riprova tra un attimo! 😓",
           timestamp: Date.now(),
           isError: true
       }]);
    } finally {
        setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-transparent">
      
      {/* Glass Header */}
      <div className={`flex items-center justify-between px-4 md:px-6 py-3 border-b z-20 relative transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-900/40 border-white/5' : 'bg-white/60 border-white/40'
      } backdrop-blur-md`}>
        <div className="flex items-center gap-3">
           {onToggleSidebar && (
              <button 
                onClick={onToggleSidebar}
                className={`md:hidden p-2 -ml-2 rounded-xl transition-colors active:scale-95 ${isDarkMode ? 'text-slate-300 hover:bg-white/10' : 'text-slate-600 hover:bg-black/5'}`}
              >
                  <Menu size={24} />
              </button>
           )}
           <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white/80 shadow-md transition-transform hover:scale-110`}>
              <img src={AVATAR_URL} alt="Bot" className="w-full h-full object-contain p-1" />
           </div>
           <div className="animate-fade-in hidden xs:block">
              <h2 className={`font-bold text-base ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>ISIS Romagnosi</h2>
              <p className={`text-[10px] uppercase tracking-wider font-bold flex items-center gap-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                AI Assistant
              </p>
           </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
            <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`p-2.5 rounded-xl transition-all active:scale-95 border ${
                    isAutoPlay 
                        ? 'bg-indigo-500 text-white border-indigo-600 shadow-indigo-500/30 shadow-md'
                        : (isDarkMode ? 'text-slate-400 border-transparent hover:bg-white/10' : 'text-slate-500 border-transparent hover:bg-black/5')
                }`}
                title="Lettura automatica"
            >
                {isAutoPlay ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button 
              onClick={handleClearChat}
              className={`p-2.5 rounded-xl transition-all active:scale-95 border border-transparent ${isDarkMode ? 'hover:bg-red-900/20 text-slate-400 hover:text-red-400' : 'hover:bg-red-50 text-slate-500 hover:text-red-600'}`}
              title="Cancella chat"
            >
              <Trash2 size={18} />
            </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 custom-scrollbar relative scroll-smooth">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03] select-none overflow-hidden mix-blend-overlay">
             <img src={AVATAR_URL} className="w-60 md:w-96 h-auto grayscale" alt="Watermark" />
          </div>

          {messages.length === 1 && (
             <div className="max-w-3xl mx-auto mt-4 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pop-in relative z-10">
                 {quickActions.map((action, idx) => (
                    <button 
                        key={idx}
                        onClick={() => handleSendMessage(undefined, action.prompt)}
                        className={`p-4 rounded-2xl text-left transition-all hover:-translate-y-1 active:scale-95 shadow-lg bg-gradient-to-br ${action.color} text-white`}
                    >
                        <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-3 backdrop-blur-sm">
                            {action.icon}
                        </div>
                        <p className="font-bold text-lg">{action.text}</p>
                        <p className="text-white/80 text-xs mt-1 opacity-90">{action.prompt}</p>
                    </button>
                 ))}
             </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 relative z-10 animate-message ${msg.role === Role.USER ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === Role.MODEL && (
                <div className={`w-9 h-9 rounded-2xl flex-shrink-0 flex items-center justify-center mt-auto mb-1 overflow-hidden bg-white shadow-md border-2 border-white`}>
                  <img src={AVATAR_URL} alt="Bot" className="w-full h-full object-contain p-0.5" />
                </div>
              )}

              <div className="flex flex-col gap-1 max-w-[85%] md:max-w-[75%]">
                  <div
                    className={`rounded-2xl p-4 shadow-sm backdrop-blur-sm ${
                      msg.role === Role.USER
                        ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-br-sm shadow-indigo-500/20'
                        : (isDarkMode 
                            ? (msg.isError ? 'bg-red-900/50 text-red-100 border border-red-800' : 'bg-slate-800/80 text-slate-100 border border-white/5 rounded-bl-sm') 
                            : (msg.isError ? 'bg-red-50 text-red-800 border border-red-100' : 'bg-white/90 text-slate-800 border border-white/50 rounded-bl-sm shadow-sm')
                          )
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm md:text-[15px] leading-relaxed tracking-wide font-medium">{msg.text}</div>
                  </div>
                  
                  {/* Tools */}
                  {msg.role === Role.MODEL && !msg.isError && (
                    <div className="flex items-center gap-2 px-1">
                        <button 
                            onClick={() => handlePlayAudio(msg.id, msg.text)}
                            disabled={loadingAudioId === msg.id}
                            className={`p-1.5 rounded-lg transition-all active:scale-95 flex items-center gap-1.5 text-xs font-semibold ${
                                playingMessageId === msg.id 
                                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' 
                                    : (isDarkMode ? 'text-slate-500 hover:text-indigo-300 hover:bg-white/5' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50')
                            }`}
                        >
                            {loadingAudioId === msg.id ? (
                                <Loader2 size={12} className="animate-spin" />
                            ) : playingMessageId === msg.id ? (
                                <><StopCircle size={14} /> Stop</>
                            ) : (
                                <><Volume2 size={14} /> Ascolta</>
                            )}
                        </button>
                    </div>
                   )}
              </div>
            </div>
          ))}
          
          {isThinking && (
            <div className="flex gap-3 items-end animate-message">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center bg-white shadow-md border-2 border-white mb-1`}>
                  <img src={AVATAR_URL} alt="Bot" className="w-full h-full object-contain p-0.5" />
                </div>
                <div className={`px-5 py-4 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5 ${
                    isDarkMode ? 'bg-slate-800/80 border border-white/5' : 'bg-white/80 border border-white/50'
                }`}>
                   <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                   <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                   <span className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce"></span>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
      </div>

      {/* Input Area (Floating) */}
      <div className="p-4 relative z-20">
        <div className={`relative rounded-[24px] shadow-2xl backdrop-blur-xl border transition-all duration-300 ${
            isDarkMode ? 'bg-slate-900/80 border-slate-700 shadow-black/50' : 'bg-white/80 border-white/60 shadow-indigo-100/50'
        }`}>
            {attachedFile && (
            <div className={`mx-3 mt-3 p-2.5 rounded-xl flex items-center justify-between text-xs font-medium border animate-message ${
                isDarkMode ? 'bg-indigo-900/30 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-100 text-indigo-700'
            }`}>
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-500 rounded-lg text-white">
                        <FileText size={14} />
                    </div>
                    <span className="truncate max-w-[150px] md:max-w-[200px]">{attachedFile.name}</span>
                </div>
                <button onClick={clearFile} className="hover:text-red-500 p-1.5 hover:bg-black/5 rounded-full transition-colors">
                    <X size={14} />
                </button>
            </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-end gap-2 p-2">
                {/* File Button */}
                <div className="relative">
                    <input 
                    type="file" 
                    id="file-upload" 
                    accept=".pdf" 
                    className="hidden" 
                    onChange={handleFileSelect}
                    disabled={isThinking}
                    />
                    <label 
                    htmlFor="file-upload" 
                    className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all hover:scale-110 active:scale-95 mb-1 ${
                        isDarkMode 
                            ? 'text-slate-400 hover:text-indigo-400 hover:bg-slate-800' 
                            : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-100'
                    }`}
                    >
                        <Paperclip size={20} />
                    </label>
                </div>

                {/* Text Input */}
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Scrivi un messaggio..."
                    disabled={isThinking}
                    className={`flex-1 py-3 px-2 bg-transparent border-none outline-none text-base font-medium placeholder:font-normal ${
                        isDarkMode 
                        ? 'text-white placeholder:text-slate-500' 
                        : 'text-slate-900 placeholder:text-slate-400'
                    }`}
                />

                {/* Send Button */}
                <button 
                    type="submit" 
                    disabled={(!inputValue.trim() && !attachedFile) || isThinking}
                    className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform active:scale-90 mb-0.5 ${
                        (!inputValue.trim() && !attachedFile) || isThinking
                        ? (isDarkMode ? 'bg-slate-800 text-slate-600' : 'bg-slate-200 text-slate-400')
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:-translate-y-0.5'
                    }`}
                >
                    {isThinking ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="ml-0.5" />}
                </button>
            </form>
        </div>
        <p className={`hidden md:block text-[10px] mt-3 text-center transition-colors font-medium opacity-60 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            AI Agent • G.D. Romagnosi
        </p>
      </div>
    </div>
  );
};