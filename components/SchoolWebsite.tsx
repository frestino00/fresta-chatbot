
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Users, 
  Globe, 
  Cpu, 
  Leaf, 
  Utensils, 
  Calculator, 
  Building,
  ArrowRight,
  Clock,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Sun,
  Plane,
  Bot,
  Monitor,
  FlaskConical,
  Wifi,
  X,
  Quote,
  Glasses
} from 'lucide-react';

interface SchoolWebsiteProps {
  isDarkMode: boolean;
  onNavigateToChat: () => void;
  language: 'it' | 'en' | 'fr' | 'de';
}

const getTranslations = (lang: 'it' | 'en' | 'fr' | 'de') => {
  const t = {
    it: {
      heroTitle: "Il Futuro è Nelle Tue Mani",
      heroSubtitle: "Innovazione tecnologica, tradizione formativa e sguardo internazionale. Costruisci le tue competenze in un ambiente d'eccellenza.",
      exploreCourses: "Esplora i Corsi",
      talkToAi: "Parla con l'AI",
      summerSchoolTitle: "Summer School Orientamento",
      summerSchoolBadge: "NOVITÀ",
      summerSchoolDesc: "A Giugno e Settembre 2025 apriamo le porte ai ragazzi delle medie! Una settimana di laboratori pratici per 'provare' la scuola.",
      requestInfo: "Richiedi Info",
      offerTitle: "Offerta Formativa",
      offerHeading: "I Nostri Indirizzi",
      offerDesc: "Scegli il percorso più adatto alle tue passioni. Clicca sulle schede per scoprire gli sbocchi lavorativi e universitari.",
      areaEconomic: "Area Economica",
      areaTech: "Area Tecnologica",
      areaProf: "Area Professionale",
      years: "5 Anni",
      schedule: "orari",
      keySubjects: "Materie Chiave",
      discoverMore: "Scopri opportunità",
      naoTitle: "Il Robot Umanoide NAO",
      naoSubtitle: "L'Intelligenza Artificiale entra in classe.",
      naoDesc: "Al Romagnosi il futuro è già qui. Utilizziamo NAO, il robot umanoide programmabile, per studiare il coding avanzato e l'interazione uomo-macchina.",
      codingInteractive: "Coding con NAO",
      codingDesc: "Programma i movimenti e la voce del robot tramite software.",
      vrTitle: "Realtà Virtuale",
      vrDesc: "Nei nostri laboratori utilizziamo visori VR di ultima generazione per lezioni immersive ed esperienze didattiche in 3D.",
      labsTitle: "Laboratori d'Eccellenza",
      labsDesc: "Crediamo nel sapere pratico. Oltre il 40% delle ore si svolge nei nostri laboratori tecnologicamente avanzati.",
      erasmusTitle: "Esplora l'Europa con Erasmus+",
      erasmusDesc: "Siamo una scuola accreditata Erasmus+. Offriamo borse di studio complete per stage lavorativi all'estero.",
      erasmusPoints: ["Stage di 3-4 settimane", "Certificazioni Linguistiche", "Scambi culturali"],
      openDayTitle: "Vieni a conoscerci",
      contactsTitle: "Contatti",
      headquarters: "Sede Centrale",
      branch: "Sede Beldosso",
      office: "Segreteria",
      jobOpp: "Sbocchi Lavorativi",
      uniOpp: "Università Consigliate",
      scheduleDetails: "Orari e Dettagli",
      close: "Chiudi"
    },
    en: {
      heroTitle: "The Future is In Your Hands",
      heroSubtitle: "Technological innovation, educational tradition, and an international outlook. Build your skills in a center of excellence.",
      exploreCourses: "Explore Courses",
      talkToAi: "Chat with AI",
      summerSchoolTitle: "Orientation Summer School",
      summerSchoolBadge: "NEW",
      summerSchoolDesc: "In June and September 2025, we open our doors to middle school students! A week of practical labs to 'try out' the school.",
      requestInfo: "Request Info",
      offerTitle: "Educational Offer",
      offerHeading: "Our Study Tracks",
      offerDesc: "Choose the path that suits your passions. Click on the cards to discover job opportunities and university paths.",
      areaEconomic: "Economic Area",
      areaTech: "Technological Area",
      areaProf: "Professional Area",
      years: "5 Years",
      schedule: "schedule",
      keySubjects: "Key Subjects",
      discoverMore: "Discover Opportunities",
      naoTitle: "NAO Humanoid Robot",
      naoSubtitle: "Artificial Intelligence enters the classroom.",
      naoDesc: "At Romagnosi, the future is now. We use NAO, the programmable humanoid robot, to study advanced coding and human-machine interaction.",
      codingInteractive: "Coding with NAO",
      codingDesc: "Program the robot's movements and voice via software.",
      vrTitle: "Virtual Reality",
      vrDesc: "In our labs, we use next-gen VR headsets for immersive lessons and 3D educational experiences.",
      labsTitle: "Labs of Excellence",
      labsDesc: "We believe in practical knowledge. Over 40% of hours are spent in our technologically advanced laboratories.",
      erasmusTitle: "Explore Europe with Erasmus+",
      erasmusDesc: "We are an Erasmus+ accredited school. We offer full scholarships for work internships abroad.",
      erasmusPoints: ["3-4 weeks internships", "Language Certifications", "Cultural Exchanges"],
      openDayTitle: "Come Meet Us",
      contactsTitle: "Contacts",
      headquarters: "Main Campus",
      branch: "Beldosso Branch",
      office: "Secretariat",
      jobOpp: "Job Opportunities",
      uniOpp: "University Paths",
      scheduleDetails: "Schedule & Details",
      close: "Close"
    },
    fr: {
      heroTitle: "L'Avenir est entre vos mains",
      heroSubtitle: "Innovation technologique, tradition éducative et ouverture internationale. Construisez vos compétences dans un environnement d'excellence.",
      exploreCourses: "Explorer les cours",
      talkToAi: "Discuter avec l'IA",
      summerSchoolTitle: "École d'été d'orientation",
      summerSchoolBadge: "NOUVEAU",
      summerSchoolDesc: "En juin et septembre 2025, nous ouvrons nos portes aux collégiens ! Une semaine d'ateliers pratiques.",
      requestInfo: "Demander des infos",
      offerTitle: "Offre Éducative",
      offerHeading: "Nos Filières",
      offerDesc: "Choisissez le parcours qui correspond à vos passions. Cliquez sur les cartes pour découvrir les opportunités.",
      areaEconomic: "Domaine Économique",
      areaTech: "Domaine Technologique",
      areaProf: "Domaine Professionnel",
      years: "5 Ans",
      schedule: "horaires",
      keySubjects: "Matières Clés",
      discoverMore: "En savoir plus",
      naoTitle: "Robot Humanoïde NAO",
      naoSubtitle: "L'Intelligence Artificielle en classe.",
      naoDesc: "À Romagnosi, le futur est déjà là. Nous utilisons NAO, le robot humanoïde programmable, pour étudier le codage avancé.",
      codingInteractive: "Codage avec NAO",
      codingDesc: "Programmez les mouvements et la voix du robot.",
      vrTitle: "Réalité Virtuelle",
      vrDesc: "Dans nos laboratoires, nous utilisons des casques VR pour des cours immersifs et des expériences 3D.",
      labsTitle: "Laboratoires d'Excellence",
      labsDesc: "Nous croyons au savoir pratique. Plus de 40% des heures se déroulent dans nos laboratoires.",
      erasmusTitle: "Explorez l'Europe avec Erasmus+",
      erasmusDesc: "Nous sommes une école accréditée Erasmus+. Nous offrons des bourses complètes pour des stages à l'étranger.",
      erasmusPoints: ["Stages de 3-4 semaines", "Certifications linguistiques", "Échanges culturels"],
      openDayTitle: "Venez nous rencontrer",
      contactsTitle: "Contacts",
      headquarters: "Siège Central",
      branch: "Siège Beldosso",
      office: "Secrétariat",
      jobOpp: "Débouchés Professionnels",
      uniOpp: "Université",
      scheduleDetails: "Horaires et Détails",
      close: "Fermer"
    },
    de: {
      heroTitle: "Die Zukunft liegt in deinen Händen",
      heroSubtitle: "Technologische Innovation, Bildungstradition und internationale Ausrichtung. Baue deine Fähigkeiten in einem exzellenten Umfeld auf.",
      exploreCourses: "Kurse Entdecken",
      talkToAi: "Mit KI sprechen",
      summerSchoolTitle: "Orientierungs-Sommerschule",
      summerSchoolBadge: "NEU",
      summerSchoolDesc: "Im Juni und September 2025 öffnen wir unsere Türen für Mittelschüler! Eine Woche praktische Workshops.",
      requestInfo: "Infos anfordern",
      offerTitle: "Bildungsangebot",
      offerHeading: "Unsere Studiengänge",
      offerDesc: "Wähle den Weg, der zu deinen Leidenschaften passt. Klicke auf die Karten, um mehr zu erfahren.",
      areaEconomic: "Wirtschaftsbereich",
      areaTech: "Technologiebereich",
      areaProf: "Berufsbereich",
      years: "5 Jahre",
      schedule: "stundenplan",
      keySubjects: "Hauptfächer",
      discoverMore: "Mehr erfahren",
      naoTitle: "NAO Humanoider Roboter",
      naoSubtitle: "Künstliche Intelligenz im Klassenzimmer.",
      naoDesc: "Am Romagnosi ist die Zukunft schon da. Wir nutzen NAO, den programmierbaren humanoiden Roboter, um fortgeschrittenes Coding zu lernen.",
      codingInteractive: "Coding mit NAO",
      codingDesc: "Programmiere die Bewegungen und die Stimme des Roboters.",
      vrTitle: "Virtuelle Realität",
      vrDesc: "In unseren Laboren nutzen wir VR-Headsets für immersiven Unterricht und 3D-Erlebnisse.",
      labsTitle: "Exzellenz-Labore",
      labsDesc: "Wir glauben an praktisches Wissen. Über 40% der Stunden finden in unseren Laboren statt.",
      erasmusTitle: "Entdecke Europa mit Erasmus+",
      erasmusDesc: "Wir sind eine Erasmus+ akkreditierte Schule. Wir bieten Vollstipendien für Auslandspraktika.",
      erasmusPoints: ["3-4 Wochen Praktika", "Sprachzertifikate", "Kulturaustausch"],
      openDayTitle: "Besuche uns",
      contactsTitle: "Kontakte",
      headquarters: "Hauptsitz",
      branch: "Zweigstelle Beldosso",
      office: "Sekretariat",
      jobOpp: "Jobmöglichkeiten",
      uniOpp: "Universität",
      scheduleDetails: "Zeitpläne & Details",
      close: "Schließen"
    }
  };

  const addresses = [
    {
      category: t[lang].areaEconomic,
      color: "text-blue-500",
      bgGradient: "from-blue-500 to-cyan-500",
      items: [
        { 
          name: "Amministrazione, Finanza e Marketing (AFM)", 
          icon: <Calculator size={24} />, 
          desc: lang === 'it' ? "Il percorso per comprendere le dinamiche economiche globali." : "Understand global economic dynamics.",
          schedule: "32h / week",
          scheduleDetail: lang === 'it' ? "Biennio comune, triennio con focus su Diritto, Economia Politica ed Economia Aziendale." : "Common two-year period, three-year focus on Law, Political Economy, and Business Administration.",
          subjects: [lang === 'it' ? "Diritto ed Economia" : "Law & Economy", lang === 'it' ? "Lingue straniere" : "Foreign Languages", "Informatica"],
          jobs: [
            "Dottore Commercialista (dopo laurea)",
            "Direttore di Banca / Finanza",
            "Responsabile Risorse Umane (HR)",
            "Broker Assicurativo e Finanziario",
            "Analista Finanziario",
            "Amministrazione Pubblica e Privata"
          ],
          uni: [
            "Economia e Management (Bocconi - CLEAM)",
            "Giurisprudenza (Statale Milano)",
            "Scienze Politiche (Cattolica)",
            "Marketing e Comunicazione (IULM)",
            "International Economics & Management",
            "Economia Aziendale (Liuc)"
          ]
        },
        { 
          name: "Sistemi Informativi Aziendali (SIA)", 
          icon: <Cpu size={24} />, 
          desc: lang === 'it' ? "Il manager informatico del futuro: economia + coding." : "The IT manager of the future: economy + coding.",
          schedule: "32h / week",
          scheduleDetail: lang === 'it' ? "Potenziamento dell'Informatica nel triennio, gestione database e linguaggi di programmazione." : "Advanced IT in the three-year period, database management and programming languages.",
          subjects: ["Coding", "Web Design", "Database"],
          jobs: [
            "Sviluppatore Software Full Stack",
            "Data Analyst & Scientist",
            "IT Project Manager",
            "Amministratore di Database",
            "Consulente ERP (es. SAP)",
            "Web Security Junior Specialist"
          ],
          uni: [
            "Ingegneria Informatica (Politecnico Milano)",
            "Ingegneria Gestionale (Politecnico)",
            "Informatica (Bicocca / Statale)",
            "Data Science (Bicocca)",
            "Digital Marketing & E-Business",
            "Matematica o Statistica"
          ]
        },
        { 
          name: "Turismo", 
          icon: <Globe size={24} />, 
          desc: lang === 'it' ? "Valorizza il territorio, l'arte e le lingue." : "Enhance territory, art, and languages.",
          schedule: "32h / week",
          scheduleDetail: lang === 'it' ? "Studio di 3 lingue straniere dal primo anno, Geografia Turistica e Storia dell'Arte." : "Study of 3 foreign languages from the first year, Tourism Geography and Art History.",
          subjects: ["3 Languages", "Art & Territory", "Geography"],
          jobs: [
            "Direttore d'Albergo (Hotel Manager)",
            "Tour Operator Specialist",
            "Organizzatore di Eventi e Congressi",
            "Hostess/Steward di Terra e di Volo",
            "Guida Turistica e Museale",
            "Destination Manager"
          ],
          uni: [
            "Scienze del Turismo (Bicocca)",
            "Lingue e Mediazione Culturale (IULM)",
            "Beni Culturali e Storia dell'Arte",
            "Economia del Turismo",
            "Lingue Straniere (Cattolica)",
            "Scienze della Comunicazione"
          ]
        }
      ]
    },
    {
      category: t[lang].areaTech,
      color: "text-green-500",
      bgGradient: "from-emerald-500 to-teal-500",
      items: [
        { 
          name: "Costruzioni, Ambiente e Territorio (CAT)", 
          icon: <Building size={24} />, 
          desc: lang === 'it' ? "Progetta le città di domani e tutela l'ambiente." : "Design tomorrow's cities and protect the environment.",
          schedule: "32-34h / week",
          scheduleDetail: lang === 'it' ? "Ampio spazio ai laboratori di Progettazione CAD, Topografia, Cantieri e Sicurezza." : "Extensive labs for CAD Design, Topography, Construction Sites, and Safety.",
          subjects: ["CAD/BIM", "Topography", "Safety"],
          jobs: [
            "Geometra (Libera Professione)",
            "Direttore di Cantiere",
            "Progettista BIM Specialist",
            "Coordinatore della Sicurezza",
            "Valutatore Immobiliare (Real Estate)",
            "Pilota di Droni per Topografia"
          ],
          uni: [
            "Ingegneria Civile (Politecnico Milano)",
            "Architettura (Politecnico Milano)",
            "Ingegneria Edile-Architettura",
            "Pianificazione Territoriale e Urbanistica",
            "Interior Design (IED / NABA)",
            "Scienze Ambientali"
          ]
        },
        { 
          name: lang === 'it' ? "Agraria e Agroalimentare" : "Agriculture & Agribusiness", 
          icon: <Leaf size={24} />, 
          desc: lang === 'it' ? "Gestione del territorio, produzioni e ambiente." : "Land management, production, and environment.",
          schedule: "32h / week",
          scheduleDetail: lang === 'it' ? "Focus su Scienze, Chimica applicata, Biotecnologie agrarie e trasformazione prodotti." : "Focus on Science, Applied Chemistry, Agricultural Biotechnologies, and product transformation.",
          subjects: ["Biotech", "Food Science", "Environment"],
          jobs: [
            "Perito Agrario",
            "Responsabile Qualità Alimentare",
            "Manager di Azienda Agricola",
            "Progettista del Verde e Giardini",
            "Tecnico nei Parchi Naturali",
            "Enologo / Gestione Cantine"
          ],
          uni: [
            "Scienze Agrarie (Statale Milano)",
            "Scienze e Tecnologie Alimentari",
            "Viticoltura ed Enologia",
            "Scienze Biologiche / Biotecnologie",
            "Medicina Veterinaria",
            "Scienze per l'Ambiente e la Natura"
          ]
        },
        { 
          name: lang === 'it' ? "Elettronica ed Automazione" : "Electronics & Automation", 
          icon: <Cpu size={24} />, 
          desc: lang === 'it' ? "Tecnologia pura, robotica e sistemi automatici." : "Pure technology, robotics, and automated systems.",
          schedule: "32h / week",
          scheduleDetail: lang === 'it' ? "Laboratori di Elettronica, Sistemi e Automazione industriale." : "Labs for Electronics, Systems, and Industrial Automation.",
          subjects: ["Automation", "Robotics", "Electronics"],
          jobs: [
            "Tecnico dell'Automazione Industriale",
            "Programmatore PLC e Robot",
            "Progettista Elettronico",
            "Manutentore Meccatronico",
            "Installatore Sistemi IoT e Domotica",
            "Tecnico Hardware e Reti"
          ],
          uni: [
            "Ingegneria Elettronica (Politecnico)",
            "Ingegneria dell'Automazione (Politecnico)",
            "Ingegneria Aerospaziale",
            "Fisica o Matematica",
            "Ingegneria Biomedica",
            "Ingegneria Meccanica"
          ]
        }
      ]
    },
    {
      category: t[lang].areaProf,
      color: "text-orange-500",
      bgGradient: "from-orange-500 to-amber-500",
      items: [
        { 
          name: lang === 'it' ? "Enogastronomia (Sede Longone al Segrino)" : "Gastronomy (Longone al Segrino Campus)", 
          icon: <Utensils size={24} />, 
          desc: lang === 'it' ? "L'eccellenza della cucina in un contesto paesaggistico unico." : "Culinary excellence in a unique landscape context.",
          schedule: "32-36h / week",
          scheduleDetail: lang === 'it' ? "Laboratori pratici di cucina e sala per oltre il 40% del monte ore totale." : "Practical cooking and service labs for over 40% of total hours.",
          subjects: [lang === 'it' ? "Cucina" : "Cooking", lang === 'it' ? "Sala" : "Service", lang === 'it' ? "Alimenti" : "Food Science"],
          jobs: [
            "Executive Chef / Cuoco",
            "Maître di Sala",
            "Pastry Chef (Pasticcere)",
            "Food & Beverage Manager",
            "Barman / Mixologist",
            "Organizzatore Catering e Banqueting"
          ],
          uni: [
            "Scienze Gastronomiche (Pollenzo)",
            "Scienze e Tecnologie della Ristorazione",
            "Hospitality Management (es. Glion)",
            "Biologia della Nutrizione",
            "Economia e Gestione dei Servizi Turistici",
            "Corsi di Alta Cucina (es. ALMA)"
          ]
        }
      ]
    }
  ];

  const labs = [
    { title: lang === 'it' ? "Laboratorio di Automazione" : "Automation Lab", icon: <Bot />, desc: lang === 'it' ? "Dotato di PLC industriali Siemens, bracci robotici." : "Equipped with Siemens industrial PLCs and robotic arms." },
    { title: lang === 'it' ? "Laboratorio Informatico" : "IT Lab", icon: <Monitor />, desc: lang === 'it' ? "Postazioni PC di ultima generazione per lo sviluppo software." : "Next-gen PC stations for software development." },
    { title: lang === 'it' ? "Laboratorio di Scienze" : "Science Lab", icon: <FlaskConical />, desc: lang === 'it' ? "Spazi attrezzati per chimica, fisica e biologia." : "Equipped spaces for chemistry, physics, and biology." },
    { title: "Smart Classrooms", icon: <Wifi />, desc: lang === 'it' ? "LIM interattive e copertura Wi-Fi in fibra ottica." : "Interactive whiteboards and fiber optic Wi-Fi." },
  ];

  const quotes = [
    { text: "L'istruzione è l'arma più potente che puoi usare per cambiare il mondo.", author: "Nelson Mandela" },
    { text: "Il futuro appartiene a coloro che credono nella bellezza dei propri sogni.", author: "Eleanor Roosevelt" },
    { text: "Non aspettare. Il tempo non sarà mai 'giusto'. Inizia dove ti trovi.", author: "Napoleon Hill" }
  ];

  return { t: t[lang], addresses, labs, quotes };
};

export const SchoolWebsite: React.FC<SchoolWebsiteProps> = ({ isDarkMode, onNavigateToChat, language }) => {
  const [selectedTrack, setSelectedTrack] = useState<any | null>(null);
  const [currentQuote, setCurrentQuote] = useState(0);
  const { t, addresses, labs, quotes } = getTranslations(language);

  // Auto-rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const textColor = isDarkMode ? 'text-slate-100' : 'text-slate-800';
  const subTextColor = isDarkMode ? 'text-slate-400' : 'text-slate-600';
  const cardBg = isDarkMode ? 'bg-slate-800/50 border-white/5' : 'bg-white/80 border-slate-200';
  const sectionBg = isDarkMode ? 'bg-slate-900/30' : 'bg-slate-50/50';

  return (
    <div className={`h-full overflow-y-auto custom-scrollbar scroll-smooth relative ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
      
      {/* Detail Modal Overlay */}
      {selectedTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedTrack(null)}>
          <div 
            className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-6 md:p-8 animate-pop-in relative ${isDarkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedTrack(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-slate-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                {selectedTrack.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold leading-tight">{selectedTrack.name}</h3>
                <p className={`text-sm mt-1 ${subTextColor}`}>{selectedTrack.desc}</p>
              </div>
            </div>

            <div className="space-y-6">
               <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                  <h4 className="font-bold flex items-center gap-2 mb-2 text-indigo-500">
                    <Clock size={18} /> {t.scheduleDetails}
                  </h4>
                  <p className="text-sm">{selectedTrack.scheduleDetail}</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-slate-700' : 'border-slate-100 bg-emerald-50/30'}`}>
                    <h4 className="font-bold flex items-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400">
                      <Briefcase size={18} /> {t.jobOpp}
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedTrack.jobs.map((job: string, i: number) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                          <span className={`${subTextColor} font-medium`}>{job}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-slate-700' : 'border-slate-100 bg-purple-50/30'}`}>
                    <h4 className="font-bold flex items-center gap-2 mb-3 text-purple-600 dark:text-purple-400">
                      <GraduationCap size={18} /> {t.uniOpp}
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedTrack.uni.map((u: string, i: number) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></span>
                          <span className={`${subTextColor} font-medium`}>{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button 
                onClick={() => setSelectedTrack(null)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Custom Image and Quotes */}
      <div className="relative h-[550px] flex items-center justify-center overflow-hidden rounded-b-[40px] shadow-2xl group">
        {/* Background Image - Using a placeholder for the school, replace with actual upload */}
        <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop" 
                alt="ISIS Romagnosi School Building" 
                className="w-full h-full object-cover transition-transform duration-[10s] ease-linear group-hover:scale-110 filter brightness-[0.7] saturate-[0.8]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-message flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            ISIS G.D. Romagnosi • Erba
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-none drop-shadow-lg">
            {t.heroTitle}
          </h1>
          
          {/* Motivational Quote Carousel */}
          <div className="h-16 mb-8 w-full max-w-xl mx-auto hidden md:block">
             {quotes.map((quote, idx) => (
                <div 
                    key={idx} 
                    className={`transition-all duration-700 ease-in-out absolute left-0 right-0 mx-auto ${currentQuote === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ display: currentQuote === idx ? 'block' : 'none' }}
                >
                    <p className="text-lg md:text-xl text-blue-100 italic leading-relaxed font-light">
                      "{quote.text}"
                    </p>
                    <p className="text-sm text-blue-300 mt-2 font-medium">- {quote.author}</p>
                </div>
             ))}
          </div>
          {/* Mobile Fallback for quote */}
          <p className="md:hidden text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
             {t.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <a href="#indirizzi" className="px-8 py-4 bg-white text-indigo-900 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
              {t.exploreCourses} <ArrowRight size={18} />
            </a>
            <button 
              onClick={onNavigateToChat}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Users size={20} />
              {t.talkToAi}
            </button>
          </div>
        </div>
      </div>

      {/* Summer School Banner */}
      <div className={`mx-4 md:mx-8 -mt-10 relative z-20 rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 border ${isDarkMode ? 'bg-slate-800 border-orange-500/30' : 'bg-white border-orange-100'}`}>
         <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
         <div className={`p-4 rounded-2xl shrink-0 ${isDarkMode ? 'bg-orange-900/40 text-orange-400' : 'bg-orange-50 text-orange-600'}`}>
            <Sun size={32} />
         </div>
         <div className="flex-1 text-center md:text-left">
            <h3 className={`text-xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2 ${textColor}`}>
               <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">{t.summerSchoolBadge}</span>
               {t.summerSchoolTitle}
            </h3>
            <p className={`text-sm leading-relaxed ${subTextColor}`}>
              {t.summerSchoolDesc}
            </p>
         </div>
         <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 whitespace-nowrap transition-transform active:scale-95">
            {t.requestInfo}
         </button>
      </div>

      {/* Indirizzi di Studio */}
      <div id="indirizzi" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-indigo-500 font-bold tracking-wider uppercase text-xs mb-2 block">{t.offerTitle}</span>
          <h2 className={`text-3xl md:text-5xl font-bold ${textColor}`}>{t.offerHeading}</h2>
          <p className={`mt-4 max-w-2xl mx-auto text-lg ${subTextColor}`}>
            {t.offerDesc}
          </p>
        </div>

        <div className="space-y-16">
          {addresses.map((area, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-4 mb-8">
                 <h3 className={`text-2xl font-bold ${area.color}`}>{area.category}</h3>
                 <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {area.items.map((item, i) => (
                  <div 
                    key={i} 
                    className={`group relative p-6 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full cursor-pointer overflow-hidden ${cardBg}`}
                    onClick={() => setSelectedTrack(item)}
                  >
                    {/* Hover Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${area.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                    <div className="flex items-start justify-between mb-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-sm ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-50 text-slate-700'}`}>
                           {item.icon}
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${isDarkMode ? 'border-slate-700 text-slate-400' : 'border-slate-100 text-slate-500 bg-slate-50'}`}>
                           {t.years}
                        </span>
                    </div>
                    
                    <h4 className={`text-xl font-bold mb-3 leading-tight group-hover:text-indigo-500 transition-colors ${textColor}`}>{item.name}</h4>
                    <p className={`text-sm mb-6 leading-relaxed ${subTextColor}`}>{item.desc}</p>
                    
                    <div className="mt-auto pt-6 border-t border-dashed border-slate-200 dark:border-slate-700 space-y-4">
                       <div className="flex items-center gap-2 text-sm font-medium opacity-80">
                          <Clock size={16} className="text-indigo-500" />
                          <span>{item.schedule}</span>
                       </div>
                       
                       <div>
                          <p className="text-xs font-bold uppercase tracking-wider opacity-50 mb-2">{t.keySubjects}</p>
                          <div className="flex flex-wrap gap-2">
                             {item.subjects.slice(0, 3).map((sub, s) => (
                                <span key={s} className={`text-xs px-2.5 py-1 rounded-lg font-medium ${isDarkMode ? 'bg-slate-700/50 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                                   {sub}
                                </span>
                             ))}
                          </div>
                       </div>

                       <div className="pt-2">
                          <span className={`text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all ${area.color}`}>
                             {t.discoverMore} <ArrowRight size={16} />
                          </span>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Innovation Section: NAO & VR */}
      <div className={`py-20 px-4 md:px-8 bg-slate-900 text-white relative overflow-hidden`}>
         {/* Background Elements */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className="order-2 lg:order-1 space-y-8">
                  <div className="inline-block px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-lg text-indigo-300 text-xs font-bold uppercase tracking-wider">
                     High Tech
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                     {t.naoTitle} <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{t.naoSubtitle}</span>
                  </h2>
                  <p className="text-lg text-slate-300 leading-relaxed">
                     {t.naoDesc}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <Bot className="text-cyan-400 mb-3" size={32} />
                        <h4 className="font-bold text-lg mb-1">{t.codingInteractive}</h4>
                        <p className="text-sm text-slate-400">{t.codingDesc}</p>
                     </div>
                     <div className="p-4 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-indigo-600/20 transition-colors"></div>
                        <Glasses className="text-indigo-400 mb-3" size={32} />
                        <h4 className="font-bold text-lg mb-1">{t.vrTitle}</h4>
                        <p className="text-sm text-slate-400">{t.vrDesc}</p>
                     </div>
                  </div>
               </div>
               
               <div className="order-1 lg:order-2 flex justify-center">
                   <div className="relative w-full max-w-md aspect-square rounded-full bg-gradient-to-t from-indigo-500/20 to-transparent flex items-center justify-center p-8 border border-white/10 shadow-[0_0_50px_rgba(79,70,229,0.2)]">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Nao_Robot_%28Robocup_2016%29.jpg/800px-Nao_Robot_%28Robocup_2016%29.jpg" 
                        alt="NAO Humanoid Robot" 
                        className="w-full h-full object-cover rounded-3xl drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                        style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                      />
                   </div>
               </div>
            </div>
         </div>
      </div>

      {/* Laboratori Avanzati */}
      <div className={`py-20 px-4 md:px-8 ${sectionBg}`}>
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>{t.labsTitle}</h2>
              <p className={`max-w-2xl mx-auto ${subTextColor}`}>
                 {t.labsDesc}
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {labs.map((lab, i) => (
                 <div key={i} className={`p-6 rounded-3xl border transition-all hover:shadow-xl hover:-translate-y-1 ${cardBg}`}>
                    <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${isDarkMode ? 'bg-indigo-900/50 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                       {React.cloneElement(lab.icon as React.ReactElement<any>, { size: 24 })}
                    </div>
                    <h3 className={`text-lg font-bold mb-3 ${textColor}`}>{lab.title}</h3>
                    <p className={`text-sm leading-relaxed ${subTextColor}`}>{lab.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* Erasmus Section */}
      <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
         <div className={`rounded-[3rem] p-8 md:p-12 overflow-hidden relative ${isDarkMode ? 'bg-slate-800' : 'bg-blue-600'} text-white`}>
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
               <Globe size={400} />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <div className="flex items-center gap-2 text-blue-200 font-bold uppercase tracking-wider text-xs">
                     <Plane size={16} /> Erasmus+
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight">{t.erasmusTitle}</h2>
                  <p className="text-lg text-blue-100 leading-relaxed">
                     {t.erasmusDesc}
                  </p>
                  <ul className="space-y-3">
                     {t.erasmusPoints.map((point: string, i: number) => (
                       <li key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">{i + 1}</div>
                          <span>{point}</span>
                       </li>
                     ))}
                  </ul>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80" className="rounded-2xl shadow-lg transform translate-y-8" alt="Students" />
                  <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=400&q=80" className="rounded-2xl shadow-lg" alt="Group" />
               </div>
            </div>
         </div>
      </div>

      {/* Open Day & Contatti */}
      <div id="open-day" className={`py-16 px-4 md:px-8 border-t ${isDarkMode ? 'border-white/5 bg-slate-900/50' : 'border-slate-100 bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
           
           <div>
              <h2 className={`text-3xl font-bold mb-6 ${textColor}`}>{t.openDayTitle}</h2>
              <div className="space-y-4">
                {[
                  { date: "16 Nov 2025", time: "14:30 - 17:30", type: language === 'it' ? "Presentazione" : "Presentation" },
                  { date: "14 Dec 2025", time: "14:30 - 17:30", type: language === 'it' ? "Laboratori" : "Labs" },
                  { date: "11 Jan 2026", time: "14:30 - 17:30", type: "Last Call" }
                ].map((od, i) => (
                  <div key={i} className={`flex items-center justify-between p-5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                         <Calendar size={20} />
                      </div>
                      <div>
                        <div className={`font-bold ${textColor}`}>{od.date}</div>
                        <div className={`text-sm ${subTextColor}`}>{od.time}</div>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                      {od.type}
                    </span>
                  </div>
                ))}
              </div>
           </div>

           <div>
              <h2 className={`text-3xl font-bold mb-6 ${textColor}`}>{t.contactsTitle}</h2>
              <div className={`p-8 rounded-3xl border ${cardBg}`}>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-indigo-500 mt-1" />
                    <div>
                      <h4 className={`font-bold ${textColor}`}>{t.headquarters}</h4>
                      <p className={`text-sm ${subTextColor}`}>Via G. Carducci, 5 - Erba (CO)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="text-indigo-500 mt-1" />
                    <div>
                      <h4 className={`font-bold ${textColor}`}>{t.branch}</h4>
                      <p className={`text-sm ${subTextColor}`}>Via Eupilio, 22 - Longone al Segrino</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <Phone className="text-indigo-500 mt-1" />
                     <div>
                      <h4 className={`font-bold ${textColor}`}>{t.office}</h4>
                      <p className={`text-sm ${subTextColor}`}>031 641 400 (Lun-Ven 8:00 - 14:00)</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <Mail className="text-indigo-500 mt-1" />
                     <div>
                      <h4 className={`font-bold ${textColor}`}>Email</h4>
                      <p className={`text-sm ${subTextColor}`}>orientamento@gdromagnosi.it</p>
                     </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                     <button className="flex-1 py-3 rounded-xl bg-[#1877F2] text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                       <Facebook size={18} /> Facebook
                     </button>
                     <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                       <Instagram size={18} /> Instagram
                     </button>
                  </div>
                </div>
              </div>
           </div>

        </div>
      </div>

      <div className={`py-8 text-center border-t text-sm ${isDarkMode ? 'border-white/5 text-slate-600' : 'border-slate-200 text-slate-400'}`}>
        <p>© 2025 ISIS G.D. Romagnosi - Erba. All rights reserved.</p>
      </div>

    </div>
  );
};
