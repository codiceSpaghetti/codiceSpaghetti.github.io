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
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'it', name: 'Italiano', flag: '🇮🇹' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
      { code: 'pt', name: 'Português', flag: '🇵🇹' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺' },
      { code: 'ja', name: '日本語', flag: '🇯🇵' },
      { code: 'zh', name: '中文', flag: '🇨🇳' },
      { code: 'ko', name: '한국어', flag: '🇰🇷' },
      { code: 'ar', name: 'العربية', flag: '🇸🇦' },
      { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },

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
      console.log(`Attempting to fetch: assets/js/i18n/locales/${langCode}.json`);
      const response = await fetch(`assets/js/i18n/locales/${langCode}.json`);
      console.log(`Fetch response status: ${response.status}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const jsonData = await response.json();
      console.log(`Successfully loaded ${Object.keys(jsonData).length} translations from ${langCode}.json`);
      return jsonData;
      
    } catch (error) {
      console.warn(`Failed to fetch ${langCode}.json:`, error.message);
      console.warn('Falling back to embedded translations...');
      // Fallback for file:// protocol - embed critical translations
      return this.getFallbackTranslations(langCode);
    }
  }

  /**
   * Fallback translations for file:// protocol - complete fallbacks
   */
  getFallbackTranslations(langCode) {
    // Complete fallback translations when JSON files can't be loaded
    const completeFallbacks = {
      'en': {
        "nav-home": "Home",
        "nav-about": "About",
        "nav-tech": "Tech Stack",
        "nav-resume": "Resume",
        "nav-portfolio": "Portfolio",
        "nav-contact": "Contact",
        "language-label": "Language",
        "language-selector-header": "Select language ({count} available)",
        
        "hero-subtitle": "Making AI speak your language, one model at a time",
        "multilingual-typed": ["I train LLMs to speak your language.", "我训练大型语言模型来讲你的语言。", "Entreno LLMs para hablar tu idioma.", "Ich trainiere LLMs, damit sie deine Sprache sprechen.", "J'entraîne des LLM pour qu'ils parlent votre langue.", "あなたの言語を话せるように、LLMを訓練しています。", "Treino LLMs para falar o seu idioma.", "أقوم بتدريب LLM لتتحدث لغتك.", "Alleno LLM per parlare la tua lingua.", "Я обучаю LLM говорить на вашем языке."],
        
        "about-title": "About me in O(1)",
        "about-description": "I'm an AI researcher and engineer focused on multilingual large language models.",
        "about-role": "AI Engineer & Researcher",
        "about-intro": "At Translated, I helped build Lara from scratch, a machine translation LLM that powers content for Airbnb, Uber, Shopify, and others, reaching over 200 million users.",
        "birth-place-label": "Birth Place:",
        "birth-place": "Naples, Italy",
        "email-label": "Email:",
        "city-label": "City:",
        "city": "Rome, Italy",
        "masters-label": "M.S. Degree:",
        "masters-degree": "AI & Data Engineering",
        "bachelors-label": "B.S. Degree:",
        "bachelors-degree": "Computer Engineering",
        "university-label": "University:",
        "university": "University of Pisa",
        "languages-label": "Languages:",
        "languages": "Italian, English",
        "focus-label": "Focus:",
        "focus": "Multilingual LLMs",
        "about-conclusion": "I've scaled training to 1,000+ GPUs and expanded machine translation coverage to 201 languages. I co-founded <a href=\"https://picarta.ai/\" target=\"_blank\" style=\"color: var(--accent-primary); text-decoration: none; font-weight: 600;\">Picarta.ai</a>, an AI startup building an image geolocalization platform. I'm a voracious learner who constantly pushes to improve how I think, train, and build. I can't imagine a life without some form of training, whether it's GPUs, gym plates, or marathon prep.",
        
        "tech-title": "Technologies & Tools",
        
        "focus-title": "Current Focus",
        "focus-description": "What I'm building and researching right now",
        "focus-scaling-title": "Scaling machine translation to 201 Languages",
        "focus-scaling-desc": "Expanding machine translation coverage while maintaining quality. Working with massive multilingual datasets and optimizing for low-resource languages using advanced transfer learning techniques.",
        "focus-production-title": "Multilingual AI in Production",
        "focus-production-desc": "Building robust translation systems that handle real-world complexity at scale. Tackling challenges like code-switching, domain adaptation, noisy user generated content and maintaining quality across 200+ million daily users.",
        "tag-realtime": "Real-time Serving",
        "tag-quality": "Quality Assurance",
        
        "resume-title": "Resume",
        "resume-description": "AI Engineer and Researcher with extensive experience in building and scaling multilingual machine translation systems. Proven track record of serving 200+ million users through innovative LLM solutions.",
        "experience-title": "Professional Experience",
        "current-role": "AI Engineer & Researcher",
        "current-company": "Translated, Rome, Italy",
        "lara-desc": "<strong>Lara:</strong> Worked on the full R&D pipeline of an LLM optimized for machine translation: from data collection and model training to alignment and inference optimization. Built from scratch within a startup-style team of four operating within the company. Now the flagship B2B product, it translates all content worldwide for Airbnb and most of Uber, Shopify, Nike, and more, reaching over 200M users globally. A B2C version has also recently launched.",
        "try-here": "Try it here",
        "lara-grande-desc": "<strong>Lara Grande:</strong> Key role in scaling LLM to match the quality of the top 1% of professional translators. Used over 1,000 GPUs on CINECA's HPC cluster for large-scale distributed training.",
        "language-expansion-desc": "<strong>Language Expansion:</strong> Identified and led a successful research project to expand machine translation production coverage from 56 to 201 languages, a 4× increase, making it the first commercial machine translation engine to support such a range. Proposed the direction, designed the implementation plan, and led it to completion within eight months.",
        "instruction-mt-desc": "<strong>Instruction-following machine translation:</strong> Led research aligning LLM to follow detailed style guides using SFT and DPO.",
        "trust-attention-desc": "<strong>Trust Attention:</strong> Proposed and validated a novel technique prioritizing high-value training data, achieving the most significant machine translation quality improvements in five years.",
        "polyglot-desc": "<strong>Polyglot:</strong> Developed a Language Identification model supporting 201 languages.",
        
        "startup-title": "Startup Experience",
        "startup-role": "Co-Founder & AI Engineer",
        "italy": "Italy",
        "startup-desc1": "Co-founded AI startup as part of three-person founding team building image geolocalization platform",
        "startup-desc2": "Developed the core model for image geolocalization using vision transformers and retrieval-based techniques",
        "startup-desc3": "Gained valuable experience in fast-paced startup environment and product development",
        "startup-desc4": "Learned crucial lessons about team dynamics, uncertainty management, and rapid iteration",
        
        "education-title": "Education",
        "masters-full": "M.S. Artificial Intelligence & Data Engineering",
        "university-location": "University of Pisa, Pisa, Italy",
        "masters-description": "110/110 summa cum laude (4.0 GPA). Specialized in Data Mining, Machine Learning, Computer Vision, Natural Language Processing, Optimization Theory, and Process Mining. Gained hands-on experience with Distributed Systems, Cloud Computing, and tools like MongoDB, Neo4j, Docker, Kubernetes, TensorFlow, and PyTorch.",
        "bachelors-full": "B.S. Computer Engineering",
        "bachelors-description": "110/110 (4.0 GPA). Strong foundation in computer engineering including mathematics, physics, algorithms, databases, computer architecture, computer networks, operating systems, and programming in C, C++, Java, Python, Matlab, SQL, JavaScript, and PHP.",
        
        "portfolio-title": "Portfolio",
        "portfolio-description": "A collection of my AI and machine learning projects, from academic research to production systems serving millions of users worldwide.",
        "t4sa-desc": "Cross-modal visual sentiment analysis system using knowledge distillation from text to vision models. Published at ECAI 2023, achieving state-of-the-art results on visual sentiment prediction.",
        "numpygpt-desc": "A from-scratch GPT built with NumPy and Python's standard library. No autograd, no frameworks: every layer is re-implemented with its own forward and backward pass. Gradients are computed manually, updates are transparent, and every operation is spelled out.",
        "fake-news-desc": "Multi-modal AI system for misinformation detection using transformer architectures. Features stance analysis and source credibility scoring.",
        "unimusic-desc": "Scalable music discovery platform with hybrid MongoDB/Neo4j architecture. Handles millions of tracks with real-time recommendation algorithms.",
        "voice-vibes-desc": "Speech emotion recognition system with six novel AI architectures. Achieved 94% accuracy using ensemble methods and advanced feature engineering.",
        "federated-dbscan-desc": "Privacy-preserving distributed clustering with federated learning. Enables collaborative ML without data sharing, achieving 99% privacy preservation.",
        "pagerank-desc": "High-performance PageRank algorithm implementation with optimized sparse matrix operations. Handles graphs with millions of nodes efficiently.",
        
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
      'es': {
        "nav-home": "Inicio",
        "nav-about": "Acerca de",
        "nav-tech": "Tecnologías",
        "nav-resume": "Currículum",
        "nav-portfolio": "Portafolio",
        "nav-contact": "Contacto",
        "language-label": "Idioma",
        "language-selector-header": "Seleccionar idioma ({count} disponibles)",
        
        "hero-subtitle": "Haciendo que la IA hable tu idioma, un modelo a la vez",
        "multilingual-typed": ["Entreno LLMs para hablar tu idioma.", "我训练大型语言模型来讲你的语言。", "I train LLMs to speak your language.", "Ich trainiere LLMs, damit sie deine Sprache sprechen.", "J'entraîne des LLM pour qu'ils parlent votre langue.", "あなたの言語を话せるように、LLMを訓練しています。", "Treino LLMs para falar o seu idioma.", "أقوم بتدريب LLM لتتحدث لغتك.", "Alleno LLM per parlare la tua lingua.", "Я обучаю LLM говорить на вашем языке."],
        
        "about-title": "Acerca de mí en O(1)",
        "about-description": "Soy un investigador e ingeniero de IA enfocado en modelos de lenguaje multilingües.",
        "about-role": "Ingeniero e Investigador de IA",
        "about-intro": "En Translated, ayudé a construir Lara desde cero, un LLM de traducción automática que impulsa contenido para Airbnb, Uber, Shopify y otros, alcanzando más de 200 millones de usuarios.",
        "birth-place-label": "Lugar de Nacimiento:",
        "birth-place": "Nápoles, Italia",
        "email-label": "Email:",
        "city-label": "Ciudad:",
        "city": "Roma, Italia",
        "masters-label": "Maestría:",
        "masters-degree": "IA e Ingeniería de Datos",
        "bachelors-label": "Licenciatura:",
        "bachelors-degree": "Ingeniería Informática",
        "university-label": "Universidad:",
        "university": "Universidad de Pisa",
        "languages-label": "Idiomas:",
        "languages": "Italiano, Inglés",
        "focus-label": "Enfoque:",
        "focus": "LLMs Multilingües",
        "about-conclusion": "He escalado entrenamiento a más de 1,000 GPUs y expandido la cobertura de traducción automática a 201 idiomas. Co-fundé <a href=\"https://picarta.ai/\" target=\"_blank\" style=\"color: var(--accent-primary); text-decoration: none; font-weight: 600;\">Picarta.ai</a>, una startup de IA que construye una plataforma de geolocalización de imágenes. Soy un aprendiz voraz que constantemente busca mejorar cómo pienso, entreno y construyo.",
        
        "tech-title": "Tecnologías y Herramientas",
        "focus-title": "Enfoque Actual",
        "focus-description": "En qué estoy trabajando e investigando ahora mismo",
        "focus-scaling-title": "Escalando traducción automática a 201 idiomas",
        "focus-scaling-desc": "Expandiendo la cobertura de traducción automática manteniendo la calidad. Trabajando con conjuntos de datos multilingües masivos y optimizando para idiomas de bajos recursos usando técnicas avanzadas de aprendizaje por transferencia.",
        "focus-production-title": "IA Multilingüe en Producción",
        "focus-production-desc": "Construyendo sistemas de traducción robustos que manejan la complejidad del mundo real a escala. Abordando desafíos como cambio de código, adaptación de dominio, contenido ruidoso generado por usuarios y manteniendo calidad para más de 200 millones de usuarios diarios.",
        "tag-realtime": "Servicio en Tiempo Real",
        "tag-quality": "Aseguramiento de Calidad",
        
        "resume-title": "Currículum",
        "resume-description": "Ingeniero e Investigador de IA con amplia experiencia en construcción y escalado de sistemas de traducción automática multilingües. Historial comprobado sirviendo a más de 200 millones de usuarios a través de soluciones LLM innovadoras.",
        "experience-title": "Experiencia Profesional",
        "current-role": "Ingeniero e Investigador de IA",
        "current-company": "Translated, Roma, Italia",
        "lara-desc": "<strong>Lara:</strong> Trabajé en todo el pipeline de I+D de un LLM optimizado para traducción automática: desde recolección de datos y entrenamiento del modelo hasta alineación y optimización de inferencia. Construido desde cero dentro de un equipo estilo startup de cuatro personas operando dentro de la empresa.",
        "try-here": "Pruébalo aquí",
        "lara-grande-desc": "<strong>Lara Grande:</strong> Papel clave en escalar LLM para igualar la calidad del 1% superior de traductores profesionales. Usé más de 1,000 GPUs en el clúster HPC de CINECA para entrenamiento distribuido a gran escala.",
        "language-expansion-desc": "<strong>Expansión de Idiomas:</strong> Identifiqué y lideré un proyecto de investigación exitoso para expandir la cobertura de traducción automática en producción de 56 a 201 idiomas, un aumento de 4×.",
        "instruction-mt-desc": "<strong>Traducción automática siguiendo instrucciones:</strong> Lideré investigación alineando LLM para seguir guías de estilo detalladas usando SFT y DPO.",
        "trust-attention-desc": "<strong>Trust Attention:</strong> Propuse y validé una técnica novedosa priorizando datos de entrenamiento de alto valor, logrando las mejoras de calidad de traducción automática más significativas en cinco años.",
        "polyglot-desc": "<strong>Polyglot:</strong> Desarrollé un modelo de Identificación de Idiomas que soporta 201 idiomas.",
        
        "startup-title": "Experiencia en Startup",
        "startup-role": "Co-Fundador e Ingeniero de IA",
        "italy": "Italia",
        "startup-desc1": "Co-fundé startup de IA como parte del equipo fundador de tres personas construyendo plataforma de geolocalización de imágenes",
        "startup-desc2": "Desarrollé el modelo central para geolocalización de imágenes usando transformers de visión y técnicas basadas en recuperación",
        "startup-desc3": "Adquirí experiencia valiosa en ambiente de startup de ritmo rápido y desarrollo de productos",
        "startup-desc4": "Aprendí lecciones cruciales sobre dinámicas de equipo, gestión de incertidumbre e iteración rápida",
        
        "education-title": "Educación",
        "masters-full": "Maestría en Inteligencia Artificial e Ingeniería de Datos",
        "university-location": "Universidad de Pisa, Pisa, Italia",
        "masters-description": "110/110 summa cum laude (4.0 GPA). Especializado en Minería de Datos, Aprendizaje Automático, Visión por Computadora, Procesamiento de Lenguaje Natural, Teoría de Optimización y Minería de Procesos.",
        "bachelors-full": "Licenciatura en Ingeniería Informática",
        "bachelors-description": "110/110 (4.0 GPA). Base sólida en ingeniería informática incluyendo matemáticas, física, algoritmos, bases de datos, arquitectura de computadoras, redes de computadoras, sistemas operativos y programación.",
        
        "portfolio-title": "Portafolio",
        "portfolio-description": "Una colección de mis proyectos de IA y aprendizaje automático, desde investigación académica hasta sistemas de producción sirviendo millones de usuarios en todo el mundo.",
        "t4sa-desc": "Sistema de análisis de sentimientos visuales cross-modal usando destilación de conocimiento de modelos de texto a visión. Publicado en ECAI 2023, logrando resultados estado del arte en predicción de sentimientos visuales.",
        "numpygpt-desc": "Un GPT construido desde cero con NumPy y la librería estándar de Python. Sin autograd, sin frameworks: cada capa re-implementada con su propio pase forward y backward.",
        "resume-title": "Currículum",
        "multilingual-typed": ["Entreno LLMs para hablar tu idioma."]
      },
      'it': {
        "nav-home": "Home",
        "nav-about": "Chi Sono",
        "nav-tech": "Tecnologie",
        "nav-resume": "CV",
        "nav-portfolio": "Portfolio",
        "nav-contact": "Contatti",
        "language-label": "Lingua",
        "language-selector-header": "Seleziona la lingua ({count} disponibili)",
        "about-title": "Chi sono in O(1)",
        "contact-title": "Contatti",
        "portfolio-title": "Portfolio",
        "resume-title": "Curriculum",
        "multilingual-typed": ["Alleno LLM per parlare la tua lingua."]
      },
      'fr': {
        "nav-home": "Accueil",
        "nav-about": "À propos",
        "nav-tech": "Technologies",
        "nav-resume": "CV",
        "nav-portfolio": "Portfolio",
        "nav-contact": "Contact",
        "language-label": "Langue",
        "language-selector-header": "Sélectionner la langue ({count} disponibles)",
        "about-title": "À propos de moi en O(1)",
        "contact-title": "Contact",
        "portfolio-title": "Portfolio",
        "resume-title": "CV",
        "multilingual-typed": ["J'entraîne des LLM pour qu'ils parlent votre langue."]
      },
      'de': {
        "nav-home": "Startseite",
        "nav-about": "Über",
        "nav-tech": "Technologien",
        "nav-resume": "Lebenslauf",
        "nav-portfolio": "Portfolio",
        "nav-contact": "Kontakt",
        "language-label": "Sprache",
        "language-selector-header": "Sprache wählen ({count} verfügbar)",
        "about-title": "Über mich in O(1)",
        "contact-title": "Kontakt",
        "portfolio-title": "Portfolio",
        "resume-title": "Lebenslauf",
        "multilingual-typed": ["Ich trainiere LLMs, damit sie deine Sprache sprechen."]
      },
      'pt': {
        "nav-home": "Início",
        "nav-about": "Sobre",
        "nav-tech": "Tecnologias",
        "nav-resume": "Currículo",
        "nav-portfolio": "Portfólio",
        "nav-contact": "Contato",
        "language-label": "Idioma",
        "language-selector-header": "Selecionar idioma ({count} disponíveis)",
        "about-title": "Sobre mim em O(1)",
        "contact-title": "Contato",
        "portfolio-title": "Portfólio",
        "resume-title": "Currículo",
        "multilingual-typed": ["Treino LLMs para falar o seu idioma."]
      }
    };

    if (minimalFallbacks[langCode]) {
      console.log(`Using minimal fallback translations for ${langCode}`);
      return minimalFallbacks[langCode];
    } else {
      console.warn(`No fallback available for ${langCode}, using English`);
      return minimalFallbacks['en'];
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
        let finalText = translatedText;
        
        // Special handling for language selector header with dynamic count
        if (key === 'language-selector-header') {
          finalText = translatedText.replace('{count}', this.supportedLanguages.length);
        }
        
        // Use innerHTML for content that contains HTML tags
        if (finalText.includes('<') || finalText.includes('>')) {
          element.innerHTML = finalText;
        } else {
          element.textContent = finalText;
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

    console.log('Rendering language dropdown with', this.supportedLanguages.length, 'languages');
    
    // Create header text showing number of supported languages
    const headerText = document.createElement('div');
    headerText.className = 'language-header';
    headerText.setAttribute('data-translate', 'language-selector-header');
    
    // Get the translation and replace {count} with actual number of languages
    const headerTemplate = this.getTranslation('language-selector-header') || 'Select language ({count} available)';
    const headerContent = headerTemplate.replace('{count}', this.supportedLanguages.length);
    headerText.textContent = headerContent;
    
    headerText.style.cssText = `
      color: var(--text-secondary);
      font-size: 0.85rem;
      font-weight: 500;
      margin-bottom: 8px;
      text-align: center;
      line-height: 1.3;
    `;
    
    // Create dropdown select element
    const dropdown = document.createElement('select');
    dropdown.className = 'language-dropdown';
    dropdown.style.cssText = `
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background: var(--bg-tertiary);
      color: var(--text-primary);
      font-size: 0.9rem;
      font-weight: 500;
      outline: none;
      cursor: pointer;
      transition: all 0.2s ease;
    `;
    
    // Add hover and focus styles
    dropdown.addEventListener('mouseenter', () => {
      dropdown.style.borderColor = 'var(--accent-primary)';
      dropdown.style.background = 'var(--bg-card-hover)';
    });
    
    dropdown.addEventListener('mouseleave', () => {
      dropdown.style.borderColor = 'var(--border-color)';
      dropdown.style.background = 'var(--bg-tertiary)';
    });
    
    dropdown.addEventListener('focus', () => {
      dropdown.style.borderColor = 'var(--accent-primary)';
      dropdown.style.boxShadow = '0 0 0 0.2rem var(--accent-shadow-focus)';
    });
    
    dropdown.addEventListener('blur', () => {
      dropdown.style.borderColor = 'var(--border-color)';
      dropdown.style.boxShadow = 'none';
    });
    
    // Populate dropdown options
    this.supportedLanguages.forEach(lang => {
      const option = document.createElement('option');
      option.value = lang.code;
      option.textContent = `${lang.flag} ${lang.name}`;
      option.setAttribute('data-lang', lang.code);
      dropdown.appendChild(option);
      console.log('Added language option for:', lang.code);
    });
    
    // Set current language as selected
    dropdown.value = this.currentLanguage;
    
    // Add change event listener
    dropdown.addEventListener('change', async (e) => {
      e.preventDefault();
      const selectedLang = e.target.value;
      console.log('Language dropdown changed to:', selectedLang);
      const success = await this.setLanguage(selectedLang);
      if (success) {
        console.log('Language changed successfully to:', selectedLang);
      }
    });
    
    // Clear existing content and add new elements
    languageSwitch.innerHTML = '';
    languageSwitch.appendChild(headerText);
    languageSwitch.appendChild(dropdown);
    
    console.log('Language dropdown rendered successfully');
  }

  /**
   * Update active language in selector
   */
  updateLanguageSelector(selectedLang) {
    const dropdown = document.querySelector('.language-dropdown');
    if (dropdown) {
      dropdown.value = selectedLang;
      console.log('Updated dropdown to show language:', selectedLang);
    }
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