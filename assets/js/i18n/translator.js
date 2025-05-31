/**
 * Translation Manager
 * Handles dynamic loading and switching of language files
 */
class Translator {
  constructor() {
    this.currentLanguage = 'en';
    this.translations = {};
    this.supportedLanguages = [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'it', name: 'Italiano', flag: '🇮🇹' }
    ];
    this.fallbackLanguage = 'en';
    this.loadingPromises = new Map();
  }

  /**
   * Initialize the translator with default language
   */
  async init() {
    console.log('Translator initializing...');
    const savedLanguage = localStorage.getItem('language') || this.fallbackLanguage;
    console.log('Saved language:', savedLanguage);
    await this.setLanguage(savedLanguage);
    this.renderLanguageSelector();
    console.log('Translator initialization complete');
  }

  /**
   * Load a language file
   */
  async loadLanguage(langCode) {
    // Return existing promise if already loading
    if (this.loadingPromises.has(langCode)) {
      return this.loadingPromises.get(langCode);
    }

    // Return cached translation if already loaded
    if (this.translations[langCode]) {
      return this.translations[langCode];
    }

    // Create loading promise
    const loadingPromise = this.fetchLanguageFile(langCode);
    this.loadingPromises.set(langCode, loadingPromise);

    try {
      const translation = await loadingPromise;
      this.translations[langCode] = translation;
      this.loadingPromises.delete(langCode);
      return translation;
    } catch (error) {
      this.loadingPromises.delete(langCode);
      console.error(`Failed to load language ${langCode}:`, error);
      
      // Fallback to English if not already trying English
      if (langCode !== this.fallbackLanguage) {
        console.log(`Falling back to ${this.fallbackLanguage}`);
        return this.loadLanguage(this.fallbackLanguage);
      }
      throw error;
    }
  }

  /**
   * Fetch language file from server
   */
  async fetchLanguageFile(langCode) {
    try {
      const response = await fetch(`assets/js/i18n/locales/${langCode}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.warn(`Failed to fetch ${langCode}.json, trying fallback...`);
      // Fallback for file:// protocol - embed critical translations
      return this.getFallbackTranslations(langCode);
    }
  }

  /**
   * Fallback translations for file:// protocol
   */
  getFallbackTranslations(langCode) {
    const fallbackTranslations = {
      'en': {
        "nav-home": "Home",
        "nav-about": "About",
        "nav-tech": "Tech Stack",
        "nav-resume": "Resume",
        "nav-portfolio": "Portfolio",
        "nav-contact": "Contact",
        "language-label": "Language",
        
        "hero-subtitle": "Making AI speak your language, one model at a time",
        "hero-typed": ["an AI Researcher", "an Engineer", "a Builder"],
        "multilingual-typed": ["I train LLMs to speak your language.", "我训练大型语言模型来讲你的语言。", "Entreno LLMs para hablar tu idioma.", "Ich trainiere LLMs, damit sie deine Sprache sprechen.", "J'entraîne des LLM pour qu'ils parlent votre langue.", "あなたの言語を話せるように、LLMを訓練しています。", "Treino LLMs para falar o seu idioma.", "أقوم بتدريب LLM لتتحدث لغتك.", "Alleno LLM per parlare la tua lingua.", "Я обучаю LLM говорить на вашем языке."],
        
        "about-title": "About me in O(1)",
        "about-description": "I'm an AI researcher and engineer focused on multilingual large language models, expanding encoder-decoder transformers to speak your language.",
        "about-role": "AI Engineer & Researcher",
        "about-intro": "AZt Translated, I helped build <a href=\"https://laratranslate.com/translate\" target=\"_blank\" rel=\"noopener noreferrer\">Lara</a> from day one, a machine translation LLM that powers content in real-time for Airbnb, Uber, Shopify, and others, reaching over <strong>200 million users.</strong>",
        "birth-place-label": "Birth Place:",
        "birth-place": "Naples, Italy 🍕",
        "email-label": "Email:",
        "city-label": "City:",
        "city": "Rome, Italy",
        "masters-label": "Master's Degree:",
        "masters-degree": "AI & Data Engineering",
        "bachelors-label": "Bachelor's Degree:",
        "bachelors-degree": "Computer Engineering",
        "university-label": "University:",
        "university": "University of Pisa",
        "languages-label": "Languages:",
        "languages": "Italian, English",
        "focus-label": "Focus:",
        "focus": "Scaling LLMs to 201 Languages",
        "about-conclusion": "I've scaled training to 1,000+ GPUs and expanded machine translation coverage to 201 languages. I co-founded <a href=\"https://picarta.ai/\" target=\"_blank\" style=\"color: var(--accent-primary); text-decoration: none; font-weight: 600;\">Picarta.ai</a>, an AI startup building an image geolocalization platform. I'm a voracious learner who constantly pushes to improve how I think, train, and build. I can't imagine a life without some form of training, whether it's GPUs 🖥️, gym plates 🏋️, or marathon prep🏃.",
        
        "multilingual-static": "I train LLMs to speak your language.",
        
        "tech-title": "Technologies & Tools",
        
        "focus-title": "Current Focus",
        "focus-description": "What I'm building and researching right now",
        "focus-scaling-title": "Scaling Machine Translation to 201 Languages",
        "focus-scaling-desc": "Expanding machine translation coverage while maintaining quality. Working with massive multilingual datasets and optimizing for low-resource languages using advanced transfer learning techniques.",
        "focus-production-title": "Multilingual AI in Production",
        "focus-production-desc": "Integrating robust translation systems that handle real-world complexity at scale. Tackling challenges like code-switching, domain adaptation, noisy user generated content, and maintaining quality across 200+ million daily users.",
        "tag-realtime": "Real-time Serving",
        "tag-quality": "Quality Assurance",
        
        "resume-title": "Resume",
        "resume-description": "AI Engineer and Researcher with extensive experience in building and scaling multilingual machine translation systems. Proven track record of serving 200+ million users through innovative LLM solutions.",
        "education-title": "Education",
        "startup-title": "Startup Experience",
        "masters-full": "M.S. Artificial Intelligence & Data Engineering",
        "university-location": "University of Pisa, Pisa, Italy",
        "masters-description": "110/110 summa cum laude (4.0 GPA). Specialized in Data Mining, Machine Learning, Computer Vision, Natural Language Processing, Optimization Theory, and Process Mining. Gained hands-on experience with Distributed Systems, Cloud Computing, and tools like MongoDB, Neo4j, Docker, Kubernetes, TensorFlow, and PyTorch.",
        "bachelors-full": "B.S. Computer Engineering",
        "bachelors-description": "110/110 (4.0 GPA). Strong foundation in computer engineering including mathematics, physics, algorithms, databases, computer architecture, computer networks, operating systems, and programming in C, C++, Java, Python, Matlab, SQL, JavaScript, and PHP.",
        "experience-title": "Professional Experience",
        "current-role": "AI Engineer & Researcher",
        "current-company": "Translated, Rome, Italy",
        "lara-desc": "<strong>Lara:</strong> Worked on the full R&D pipeline of an LLM optimized for MT: from data collection and model training to alignment and inference optimization. Built from scratch within a startup-style team of four operating within the company. Now the flagship B2B product, it translates all content worldwide for Airbnb and most of Uber, Shopify, Nike, and more, reaching over 200M users globally. A B2C version has also recently launched.",
        "lara-grande-desc": "<strong>Lara Grande:</strong> Key role in scaling LLM to match the quality of the top 1% of professional translators. Used over 1,000 GPUs on CINECA's HPC cluster for large-scale distributed training.",
        "language-expansion-desc": "<strong>Language Expansion:</strong> Identified and led a successful research project to expand machine translation production coverage from 56 to 201 languages, a 4× increase, making it the first commercial MT engine to support such a range. Proposed the direction, designed the implementation plan, and led it to completion within eight months.",
        "instruction-mt-desc": "<strong>Instruction-following MT:</strong> Led research aligning LLM to follow detailed style guides using SFT and DPO.",
        "trust-attention-desc": "<strong>Trust Attention:</strong> Proposed and validated a novel technique prioritizing high-value training data, achieving the most significant MT quality improvements in five years.",
        "polyglot-desc": "<strong>Polyglot:</strong> Developed a Language Identification model supporting 201 languages.",
        "startup-role": "Co-Founder & AI Engineer",
        "italy": "Italy",
        "startup-desc1": "Co-founded AI startup as part of three-person founding team building image geolocalization platform",
        "startup-desc2": "Developed the core model for image geolocalization using vision transformers and retrieval-based techniques",
        "startup-desc3": "Gained valuable experience in fast-paced startup environment and product development",
        "startup-desc4": "Learned crucial lessons about team dynamics, uncertainty management, and rapid iteration",
        "try-here": "Try it here",
        
        "portfolio-title": "Portfolio",
        "portfolio-description": "A collection of my AI and machine learning projects, from academic research to production systems serving millions of users worldwide.",
        "t4sa-desc": "Cross-modal visual sentiment analysis system using knowledge distillation from text to vision models. Published at ECAI 2023, achieving state-of-the-art results on visual sentiment prediction.",
        "numpygpt-desc": "A from-scratch GPT built with NumPy and Python's standard library. No autograd, no frameworks: every layer is re-implemented with its own forward and backward pass. Gradients are computed manually, updates are transparent, and every operation is spelled out.",
        "fake-news-desc": "Multi-modal AI system for misinformation detection using transformer architectures. Features stance analysis and source credibility scoring.",
        "unimusic-desc": "Scalable music discovery platform with hybrid MongoDB/Neo4j architecture. Handles millions of tracks with real-time recommendation algorithms.",
        "voice-vibes-desc": "Speech emotion recognition system with six novel AI architectures. Achieved 94% accuracy using ensemble methods and advanced feature engineering.",
        "federated-dbscan-desc": "Privacy-preserving distributed clustering with federated learning. Enables collaborative ML without data sharing, achieving 99% privacy preservation.",
        "pagerank-desc": "High-performance PageRank algorithm implementation with optimized sparse matrix operations. Handles graphs with millions of nodes efficiently.",
        
        "cta-title": "Let's Build the Future of AI Together",
        "cta-description": "Whether you're looking to collaborate on cutting-edge research, discuss the latest in multilingual LLMs, or explore how AI can transform your business, I'm always excited to connect with fellow innovators and problem solvers.",
        "cta-button1": "Start a Conversation",
        "cta-button2": "Send Direct Email",
        
        "contact-title": "Contact",
        "contact-description": "Let's connect! Whether you want to discuss AI, machine learning, or potential collaborations, I'm always open to interesting conversations.",
        "location-label": "Location",
        "location": "Rome, Italy",
        "form-name": "Your Name",
        "form-email": "Your Email",
        "form-subject": "Subject",
        "form-message": "Message",
        "form-loading": "Loading",
        "form-success": "Your message has been sent. Thank you!",
        "form-send": "Send Message"
      },
      'it': {
        "nav-home": "Home",
        "nav-about": "Chi Sono",
        "nav-tech": "Tecnologie",
        "nav-resume": "CV",
        "nav-portfolio": "Portfolio",
        "nav-contact": "Contatti",
        "language-label": "Lingua",
        
        "hero-subtitle": "Rendendo l'AI capace di parlare la tua lingua, un modello alla volta",
        "hero-typed": ["un Ricercatore AI", "un Ingegnere", "un Creatore"],
        "multilingual-typed": ["Alleno LLM per parlare la tua lingua.", "我训练大型语言模型来讲你的语言。", "Entreno LLMs para hablar tu idioma.", "Ich trainiere LLMs, damit sie deine Sprache sprechen.", "J'entraîne des LLM pour qu'ils parlent votre langue.", "あなたの言語を話せるように、LLMを訓練しています。", "Treino LLMs para falar o seu idioma.", "أقوم بتدريب LLM لتتحدث لغتك.", "I train LLMs to speak your language.", "Я обучаю LLM говорить на вашем языке."],
        
        "about-title": "Chi sono in O(1)",
        "about-description": "Sono un ricercatore e ingegnere AI specializzato in modelli linguistici multilingue, espandendo transformer encoder-decoder per parlare la tua lingua.",
        "about-role": "Ingegnere AI e Ricercatore",
        "about-intro": "In Translated, ho contribuito a far nascere <a href=\"https://laratranslate.com/translate\" target=\"_blank\" rel=\"noopener noreferrer\">Lara</a> fin dal primo giorno, un LLM per la traduzione automatica che alimenta contenuti in tempo reale per Airbnb, Uber, Shopify e altri, raggiungendo oltre <strong>200 milioni di utenti.</strong>",
        "birth-place-label": "Luogo di Nascita:",
        "birth-place": "Napoli, Italia 🍕",
        "email-label": "Email:",
        "city-label": "Città:",
        "city": "Roma, Italia",
        "masters-label": "Laurea Magistrale:",
        "masters-degree": "AI & Data Engineering",
        "bachelors-label": "Laurea Triennale:",
        "bachelors-degree": "Ingegneria Informatica",
        "university-label": "Università:",
        "university": "Università di Pisa",
        "languages-label": "Lingue:",
        "languages": "Italiano, Inglese",
        "focus-label": "Focus:",
        "focus": "Scalare LLM a 201 Lingue",
        "about-conclusion": "Mi sono formato in training distribuiti su larga scala, utilizzando fino a 1.000+ GPU ed ho espanso la copertura della traduzione automatica a 201 lingue. I co-fondato <a href=\"https://picarta.ai/\" target=\"_blank\" style=\"color: var(--accent-primary); text-decoration: none; font-weight: 600;\">Picarta.ai</a>, una startup AI che costruisce una piattaforma di geolocalizzazione di immagini. Sono uno studente vorace che spinge costantemente per migliorare come penso, addestro e costruisco. Non riesco a immaginare una vita senza qualche forma di allenamento, che si tratti di GPU 🖥️, pesi in palestra 🏋️, o preparazione per maratone🏃.",
        
        "tech-title": "Tecnologie e Strumenti",
        
        "focus-title": "Focus Attuale",
        "focus-description": "Su cosa sto lavorando e ricercando in questo momento",
        "focus-scaling-title": "Scalare MT a 201 Lingue",
        "focus-scaling-desc": "Espandere la copertura della traduzione automatica mantenendo la qualità. Lavorando con enormi dataset multilingue e ottimizzando per lingue a basse risorse usando tecniche avanzate di transfer learning.",
        "focus-production-title": "AI Multilingue in Produzione",
        "focus-production-desc": "Costruire sistemi di traduzione robusti che gestiscono la complessità del mondo reale su larga scala. Affrontare sfide come code-switching, adattamento del dominio e mantenimento della qualità per oltre 200 milioni di utenti giornalieri.",
        "tag-realtime": "Serving Real-time",
        "tag-quality": "Controllo Qualità",
        
        "resume-title": "Curriculum",
        "resume-description": "Ingegnere AI e Ricercatore con vasta esperienza nella costruzione e scalabilità di sistemi di traduzione automatica multilingue. Comprovato track record nel servire 200+ milioni di utenti attraverso soluzioni LLM innovative.",
        "education-title": "Formazione",
        "startup-title": "Startup Experience",
        "masters-full": "Laurea Magistrale in Intelligenza Artificiale e Data Engineering",
        "university-location": "Università di Pisa, Pisa, Italia",
        "masters-description": "110/110 e lode (4.0 GPA). Specializzato in Data Mining, Machine Learning, Computer Vision, Natural Language Processing, Teoria dell'Ottimizzazione e Process Mining. Esperienza pratica con Sistemi Distribuiti, Cloud Computing e strumenti come MongoDB, Neo4j, Docker, Kubernetes, TensorFlow e PyTorch.",
        "bachelors-full": "Laurea Triennale in Ingegneria Informatica",
        "bachelors-description": "110/110 (4.0 GPA). Solida base in ingegneria informatica inclusi matematica, fisica, algoritmi, database, architettura dei computer, reti informatiche, sistemi operativi e programmazione in C, C++, Java, Python, Matlab, SQL, JavaScript e PHP.",
        "experience-title": "Esperienza Professionale",
        "current-role": "Ingegnere AI e Ricercatore",
        "current-company": "Translated, Roma, Italia",
        "lara-desc": "<strong>Lara:</strong> Ho lavorato sull'intera pipeline R&D di un LLM ottimizzato per MT: dalla raccolta dati e addestramento del modello all'allineamento e ottimizzazione dell'inferenza. Costruito da zero all'interno di un team stile startup di quattro persone operante nell'azienda. Ora è il prodotto B2B di punta, traduce tutti i contenuti a livello mondiale per Airbnb e la maggior parte di Uber, Shopify, Nike e altri, raggiungendo oltre 200M di utenti globalmente. È stata lanciata di recente anche una versione B2C.",
        "lara-grande-desc": "<strong>Lara Grande:</strong> Ruolo chiave nel scalare LLM per eguagliare la qualità dell'1% migliore dei traduttori professionali. Utilizzato oltre 1.000 GPU sul cluster HPC di CINECA per addestramento distribuito su larga scala.",
        "language-expansion-desc": "<strong>Espansione Linguaggi:</strong> Identificato e guidato un progetto di ricerca di successo per espandere la copertura della traduzione automatica in produzione da 56 a 201 lingue, un aumento di 4×, rendendolo il primo motore MT commerciale a supportare tale gamma. Proposto la direzione, progettato il piano di implementazione e guidato al completamento entro otto mesi.",
        "instruction-mt-desc": "<strong>MT seguendo Istruzioni:</strong> Guidato ricerca nell'allineare LLM per seguire guide di stile dettagliate usando SFT e DPO.",
        "trust-attention-desc": "<strong>Trust Attention:</strong> Proposto e validato una tecnica innovativa che priorizza dati di addestramento ad alto valore, ottenendo i miglioramenti di qualità MT più significativi in cinque anni.",
        "polyglot-desc": "<strong>Polyglot:</strong> Sviluppato un modello di Identificazione Linguistica che supporta 201 lingue.",
        "startup-role": "Co-Fondatore e Ingegnere AI",
        "italy": "Italia",
        "startup-desc1": "Co-fondato startup AI come parte del team fondatore di tre persone costruendo piattaforma di geolocalizzazione di immagini",
        "startup-desc2": "Sviluppato il modello core per la geolocalizzazione di immagini usando vision transformer e tecniche basate su retrieval",
        "startup-desc3": "Acquisito esperienza preziosa in ambiente startup veloce e sviluppo prodotti",
        "startup-desc4": "Appreso lezioni cruciali su dinamiche di team, gestione dell'incertezza e iterazione rapida",
        "try-here": "Provalo qui",
        
        "portfolio-title": "Portfolio",
        "portfolio-description": "Una raccolta dei miei progetti AI e machine learning, dalla ricerca accademica ai sistemi di produzione che servono milioni di utenti in tutto il mondo.",
        "t4sa-desc": "Sistema di analisi del sentiment visuale cross-modale che utilizza distillazione di conoscenza da modelli di testo a visione. Pubblicato a ECAI 2023, raggiungendo risultati state-of-the-art nella predizione del sentiment visuale.",
        "numpygpt-desc": "Un GPT costruito da zero con NumPy e la libreria standard di Python. Nessun autograd, nessun framework: ogni layer è re-implementato con il proprio forward e backward pass. I gradienti sono calcolati manualmente, gli aggiornamenti sono trasparenti, e ogni operazione è specificata.",
        "fake-news-desc": "Sistema AI multi-modale per la rilevazione di disinformazione utilizzando architetture transformer. Include analisi di stance e scoring di credibilità delle fonti.",
        "unimusic-desc": "Piattaforma scalabile per la scoperta musicale con architettura ibrida MongoDB/Neo4j architecture. Gestisce milioni di tracce con algoritmi di raccomandazione in tempo reale.",
        "voice-vibes-desc": "Sistema di riconoscimento delle emozioni vocali con sei architetture AI innovative. Ha raggiunto il 94% di accuratezza utilizzando metodi ensemble e feature engineering avanzata.",
        "federated-dbscan-desc": "Clustering distribuito privacy-preserving con federated learning. Abilita ML collaborativo senza condivisione di dati, raggiungendo il 99% di preservazione della privacy.",
        "pagerank-desc": "Implementazione ad alte prestazioni dell'algoritmo PageRank con operazioni ottimizzate su matrici sparse. Gestisce grafi con milioni di nodi in modo efficiente.",
        
        "cta-title": "Costruiamo Insieme il Futuro dell'AI",
        "cta-description": "Che tu stia cercando di collaborare su ricerca all'avanguardia, discutere degli ultimi sviluppi negli LLM multilingue, o esplorare come l'AI può trasformare il tuo business, sono sempre entusiasta di connettermi con innovatori e problem solver.",
        "cta-button1": "Inizia una Conversazione",
        "cta-button2": "Invia Email Diretta",
        
        "contact-title": "Contatti",
        "contact-description": "Mettiamoci in contatto! Che tu voglia discutere di AI, machine learning, o potenziali collaborazioni, sono sempre aperto a conversazioni interessanti.",
        "location-label": "Posizione",
        "location": "Roma, Italia",
        "form-name": "Il Tuo Nome",
        "form-email": "La Tua Email",
        "form-subject": "Oggetto",
        "form-message": "Messaggio",
        "form-loading": "Caricamento",
        "form-success": "Il tuo messaggio è stato inviato. Grazie!",
        "form-send": "Invia Messaggio",
        
        "multilingual-static": "Alleno LLM per parlare la tua lingua.",
        "multilingual-typed": ["I train LLMs to speak your language.", "I train LLMs to speak your language.", "Entreno LLMs para hablar tu idioma.", "J'entraîne des LLM à parler votre langue.", "Ich trainiere LLMs, Ihre Sprache zu sprechen.", "Treino LLMs para falar sua língua.", "LLMを訓練してあなたの言語を話させます。", "أدرب نماذج اللغة الكبيرة لتتحدث بلغتك."]
      }
    };

    if (fallbackTranslations[langCode]) {
      console.log(`Using fallback translations for ${langCode}`);
      return fallbackTranslations[langCode];
    } else {
      console.warn(`No fallback available for ${langCode}, using English`);
      return fallbackTranslations['en'];
    }
  }

  /**
   * Set current language and apply translations
   */
  async setLanguage(langCode) {
    console.log('Setting language to:', langCode);
    try {
      const translation = await this.loadLanguage(langCode);
      console.log('Translation loaded successfully for:', langCode);
      this.currentLanguage = langCode;
      this.applyTranslations(translation);
      this.updateLanguageSelector(langCode);
      this.updateTypedText(translation);
      localStorage.setItem('language', langCode);
      
      // Update document language attribute
      document.documentElement.lang = langCode;
      
      // Handle RTL languages
      if (langCode === 'ar') {
        document.documentElement.dir = 'rtl';
        document.body.classList.add('rtl');
      } else {
        document.documentElement.dir = 'ltr';
        document.body.classList.remove('rtl');
      }
      
      console.log('Language successfully changed to:', langCode);
      return true;
    } catch (error) {
      console.error(`Failed to set language to ${langCode}:`, error);
      return false;
    }
  }

  /**
   * Apply translations to DOM elements
   */
  applyTranslations(translation) {
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      const translatedText = this.getTranslation(key, translation);
      
      if (translatedText) {
        // Use innerHTML for content that contains HTML tags
        if (translatedText.includes('<') || translatedText.includes('>')) {
          element.innerHTML = translatedText;
        } else {
          element.textContent = translatedText;
        }
      }
    });
  }

  /**
   * Get translation with fallback support
   */
  getTranslation(key, translation = null) {
    const currentTranslation = translation || this.translations[this.currentLanguage];
    
    if (currentTranslation && currentTranslation[key]) {
      return currentTranslation[key];
    }
    
    // Fallback to English if not current language
    if (this.currentLanguage !== this.fallbackLanguage && this.translations[this.fallbackLanguage]) {
      const fallbackTranslation = this.translations[this.fallbackLanguage][key];
      if (fallbackTranslation) {
        console.warn(`Translation missing for "${key}" in ${this.currentLanguage}, using fallback`);
        return fallbackTranslation;
      }
    }
    
    console.warn(`Translation missing for key: ${key}`);
    return key; // Return key as last resort
  }

  /**
   * Update Typed.js content
   */
  updateTypedText(translation) {
    // Update multilingual typed text only
    // Let main.js handle the hero animation to avoid conflicts
    const multilingualElement = document.querySelector('.typed-multilingual');
    if (multilingualElement && window.typedMultilingual && translation['multilingual-typed']) {
      window.typedMultilingual.destroy();
      window.typedMultilingual = new Typed('.typed-multilingual', {
        strings: translation['multilingual-typed'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
      });
    }
  }

  /**
   * Render language selector
   */
  renderLanguageSelector() {
    const languageSwitch = document.querySelector('.language-switch');
    if (!languageSwitch) {
      console.error('Language switch container not found in DOM');
      return;
    }

    console.log('Rendering language selector with', this.supportedLanguages.length, 'languages');
    languageSwitch.innerHTML = '';
    
    this.supportedLanguages.forEach(lang => {
      const button = document.createElement('button');
      button.className = 'language-option';
      button.setAttribute('data-lang', lang.code);
      button.innerHTML = `<span class="flag">${lang.flag}</span> ${lang.code.toUpperCase()}`;
      button.title = lang.name;
      button.type = 'button';
      
      // Primary event listener
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Language button clicked (addEventListener):', lang.code);
        const success = await this.setLanguage(lang.code);
        if (success) {
          this.updateLanguageSelector(lang.code);
        }
      });
      
      // Backup onclick handler
      button.onclick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Language button clicked (onclick):', lang.code);
        const success = await this.setLanguage(lang.code);
        if (success) {
          this.updateLanguageSelector(lang.code);
        }
      };
      
      // Debug: add mousedown event to see if any events are firing
      button.addEventListener('mousedown', () => {
        console.log('Mousedown detected on language button:', lang.code);
      });
      
      languageSwitch.appendChild(button);
      console.log('Added language button for:', lang.code);
    });
    
    // Set initial active language
    this.updateLanguageSelector(this.currentLanguage);
    console.log('Language selector rendered successfully');
  }

  /**
   * Update active language in selector
   */
  updateLanguageSelector(selectedLang) {
    document.querySelectorAll('.language-option').forEach(option => {
      if (option.getAttribute('data-lang') === selectedLang) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Get supported languages
   */
  getSupportedLanguages() {
    return this.supportedLanguages;
  }
}

// Export for use in other modules
window.Translator = Translator; 