import React, { useState, useEffect } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { SchoolWebsite } from './components/SchoolWebsite';
import { VeoAnimator } from './components/VeoAnimator';
import { Moon, Sun, HelpCircle, Lightbulb, X, Send, Sparkles, Layout, Bot, Film, Globe } from 'lucide-react';

const App: React.FC = () => {
  // Initialize Dark Mode based on system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Language State
  const [language, setLanguage] = useState<'it' | 'en' | 'fr' | 'de'>('it');

  const [autoQuestion, setAutoQuestion] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Navigation State
  const [currentView, setCurrentView] = useState<'website' | 'chat' | 'veo'>('website');
  
  // Feedback Modal State
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Toggle theme handler
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Listen to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const faqItems = [
    { icon: "🏫", text: "Quali indirizzi offre la scuola?" },
    { icon: "💼", text: "Sbocchi lavorativi post-diploma" },
    { icon: "🧪", text: "Come sono i laboratori?" },
    { icon: "🌍", text: "Progetti Erasmus e viaggi" },
    { icon: "🚌", text: "Dove si trova la sede?" },
  ];

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    
    // Simulate sending feedback
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setFeedbackText('');
      setIsFeedbackOpen(false);
    }, 2000);
  };

  const handleFaqClick = (question: string) => {
    setAutoQuestion(question);
    setCurrentView('chat'); // Switch to chat if an FAQ is clicked
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const languages = [
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  return (
    <div className={`h-[100dvh] w-screen flex overflow-hidden relative ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Classic Background Layer - Subtle and Static */}
      <div className="absolute inset-0 z-0 bg-tech-modern transition-colors duration-500 pointer-events-none"></div>
      
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden animate-fade-in"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation - Glassmorphism */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 flex flex-col transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:z-auto glass md:border-r-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isDarkMode ? 'border-r border-white/5' : 'border-r border-slate-200'}
      `}>
        {/* Sidebar Header with Logo */}
        <div className="p-6 pb-2 flex justify-between items-start">
          <div className="relative group cursor-pointer" onClick={() => setCurrentView('website')}>
            <div className={`relative rounded-xl p-3 border shadow-sm flex items-center justify-center transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'}`}>
              <img 
                src="https://20.gdromagnosi.it/img/xtra/logo.png" 
                alt="ISIS Romagnosi Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <h1 className={`font-bold text-xl tracking-tight mt-4 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
              Portale Orientamento
            </h1>
          </div>
          {/* Close button for mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className={`md:hidden p-2 rounded-full transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-white/10' : 'text-slate-500 hover:bg-black/5'}`}
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-2 space-y-6">
            
            {/* Main Nav */}
            <div className="space-y-1">
                <button 
                  onClick={() => { setCurrentView('website'); setIsSidebarOpen(false); }}
                  className={`w-full text-left p-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-all ${
                    currentView === 'website'
                    ? (isDarkMode ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'bg-blue-500 text-white shadow-lg shadow-blue-500/30')
                    : (isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100')
                  }`}
                >
                    <Layout size={18} />
                    <span>Home & Indirizzi</span>
                </button>
                <button 
                  onClick={() => { setCurrentView('chat'); setIsSidebarOpen(false); }}
                  className={`w-full text-left p-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-all ${
                    currentView === 'chat'
                    ? (isDarkMode ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30')
                    : (isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100')
                  }`}
                >
                    <Bot size={18} />
                    <span>Assistente AI</span>
                </button>
                <button 
                  onClick={() => { setCurrentView('veo'); setIsSidebarOpen(false); }}
                  className={`w-full text-left p-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-all ${
                    currentView === 'veo'
                    ? (isDarkMode ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/20' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/30')
                    : (isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100')
                  }`}
                >
                    <Film size={18} />
                    <span>Animatore Veo</span>
                </button>
            </div>

            {/* AI Prompt Box - Visible only on Website view to encourage switching */}
            {currentView === 'website' && (
                <div className={`p-4 rounded-xl text-sm leading-relaxed shadow-sm border ${
                    isDarkMode 
                    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-white/5 text-slate-300' 
                    : 'bg-gradient-to-br from-white to-blue-50 border-slate-200 text-slate-600'
                }`}>
                    <div className="flex items-start gap-2 mb-2">
                        <Sparkles size={16} className="text-blue-500 shrink-0 mt-0.5" />
                        <span className="font-semibold">Dubbi sull'iscrizione?</span>
                    </div>
                    <p className="text-xs opacity-80 mb-3">
                        L'Assistente AI è pronto a rispondere alle tue domande su orari, iscrizioni e altro!
                    </p>
                    <button 
                        onClick={() => setCurrentView('chat')}
                        className="w-full py-2 text-xs font-bold rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                    >
                        Chiedi all'AI
                    </button>
                </div>
            )}

            {/* FAQ Section */}
            <div>
                <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 px-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    <HelpCircle size={12} />
                    Domande Rapide
                </h3>
                <div className="space-y-2">
                    {faqItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleFaqClick(item.text)}
                            className={`w-full text-left p-3 rounded-xl text-sm transition-all duration-200 flex items-center gap-3 group hover:translate-x-1 border border-transparent ${
                                isDarkMode 
                                ? 'hover:bg-slate-800 text-slate-300 hover:border-slate-700' 
                                : 'hover:bg-white text-slate-700 hover:border-slate-200 hover:shadow-sm'
                            }`}
                        >
                            <span className="text-lg transition-all">{item.icon}</span>
                            <span className="font-medium">{item.text}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Footer Section */}
        <div className={`p-4 space-y-3 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-200/60'}`}>
          
          {/* Language Selector */}
          <div className="grid grid-cols-4 gap-1">
             {languages.map((lang) => (
               <button
                 key={lang.code}
                 onClick={() => setLanguage(lang.code as any)}
                 title={lang.label}
                 className={`p-2 rounded-lg text-lg flex items-center justify-center transition-all ${
                   language === lang.code 
                     ? (isDarkMode ? 'bg-slate-700 shadow-inner' : 'bg-slate-200 shadow-inner')
                     : (isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100')
                 }`}
               >
                 {lang.flag}
               </button>
             ))}
          </div>

           {/* Feedback Button */}
          <button 
             onClick={() => setIsFeedbackOpen(true)}
             className={`w-full flex items-center gap-2 p-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.01] active:scale-95 shadow-sm border ${
                 isDarkMode 
                 ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' 
                 : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
             }`}
          >
              <Lightbulb size={16} />
              Suggerisci idee
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl border transition-all hover:bg-opacity-80 ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-400' 
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            <span className="text-xs font-bold">{isDarkMode ? 'Tema Chiaro' : 'Tema Scuro'}</span>
          </button>

          <div className="flex justify-between items-center px-1 pt-1 opacity-60">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                System Online
              </div>
              <span className="text-[10px] text-slate-400">v3.1</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 h-full relative z-10 p-0 md:p-4 perspective-1000 flex flex-col overflow-hidden">
        <div className="w-full h-full md:rounded-2xl overflow-hidden shadow-xl glass-panel relative border-0 md:border">
           
           {/* View Router */}
           {currentView === 'website' && (
               <SchoolWebsite 
                   isDarkMode={isDarkMode} 
                   language={language}
                   onNavigateToChat={() => setCurrentView('chat')} 
               />
           )}
           
           {currentView === 'chat' && (
               <ChatInterface 
                 isDarkMode={isDarkMode} 
                 externalMessage={autoQuestion}
                 onExternalMessageHandled={() => setAutoQuestion(null)}
                 onToggleSidebar={() => setIsSidebarOpen(true)}
               />
           )}

           {currentView === 'veo' && (
               <VeoAnimator isDarkMode={isDarkMode} />
           )}
           
        </div>
      </main>

      {/* Feedback Modal */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
           <div className={`w-full max-w-md rounded-2xl shadow-2xl transform transition-all scale-100 animate-message p-1 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <div className="p-6 h-full w-full bg-inherit rounded-xl relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className={`font-bold text-lg flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        <span className="bg-amber-100 text-amber-600 p-1.5 rounded-lg"><Lightbulb size={20} /></span>
                        Migliora il sito
                      </h3>
                      <button onClick={() => setIsFeedbackOpen(false)} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
                          <X size={20} />
                      </button>
                  </div>
                  
                  {feedbackSent ? (
                      <div className="text-center py-8 animate-message">
                          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20">
                              <Send size={28} />
                          </div>
                          <h4 className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Grazie! 🚀</h4>
                          <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Il tuo feedback ci aiuta a crescere.</p>
                      </div>
                  ) : (
                      <form onSubmit={handleSendFeedback}>
                          <textarea 
                              required
                              value={feedbackText}
                              onChange={(e) => setFeedbackText(e.target.value)}
                              className={`w-full h-32 p-4 rounded-xl border text-sm resize-none focus:ring-2 focus:ring-blue-500/50 outline-none transition-all ${
                                  isDarkMode 
                                  ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500' 
                                  : 'bg-slate-50 border-slate-200 text-slate-900'
                              }`}
                              placeholder="Hai trovato un errore? Vorresti una nuova sezione? Scrivici!"
                          />
                          <div className="mt-6 flex justify-end gap-3">
                              <button 
                                  type="submit"
                                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-95"
                              >
                                  Invia Idea
                              </button>
                          </div>
                      </form>
                  )}
              </div>
           </div>
        </div>
      )}
      
    </div>
  );
};

export default App;