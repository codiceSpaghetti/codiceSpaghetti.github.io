# Internationalization (i18n) System

This is a scalable, modular internationalization system for the portfolio website that supports dynamic loading of multiple languages.

## 🌍 Features

- **Dynamic Language Loading**: Languages are loaded on-demand from separate JSON files
- **Fallback Support**: Automatic fallback to English if translations are missing
- **RTL Support**: Built-in support for right-to-left languages (Arabic)
- **Flag Icons**: Visual language selector with country flags
- **Caching**: Translations are cached after loading for performance
- **Error Handling**: Graceful handling of missing translation files
- **Typed.js Integration**: Dynamic updating of animated text content

## 📁 File Structure

```
/assets/js/i18n/
├── translator.js          # Core translation manager
├── locales/              # Language files directory
│   ├── en.json          # English (default/fallback)
│   ├── it.json          # Italian
│   ├── es.json          # Spanish
│   ├── fr.json          # French
│   ├── de.json          # German
│   ├── pt.json          # Portuguese
│   ├── ja.json          # Japanese (placeholder)
│   ├── zh.json          # Chinese (placeholder)
│   ├── ar.json          # Arabic (placeholder)
│   └── ru.json          # Russian (placeholder)
└── README.md            # This documentation
```

## 🚀 Usage

### Basic Implementation

The system is automatically initialized when the page loads:

```javascript
// Initialize translator
const translator = new Translator();
await translator.init();
```

### HTML Integration

Add `data-translate` attributes to elements that need translation:

```html
<h2 data-translate="about-title">About me in O(1)</h2>
<p data-translate="about-description">Description text here...</p>
```

### Language Switching

The language selector is automatically generated based on supported languages defined in `translator.js`:

```javascript
this.supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  // ... more languages
];
```

## 📝 Adding New Languages

### Step 1: Create Translation File

Create a new JSON file in `assets/js/i18n/locales/` following the naming convention `{language-code}.json`:

```json
{
  "nav-home": "Home",
  "nav-about": "About",
  "hero-subtitle": "Your translated subtitle",
  "hero-typed": ["Translated", "Text", "Array"],
  // ... all other keys
}
```

### Step 2: Add Language to Supported List

Update the `supportedLanguages` array in `translator.js`:

```javascript
this.supportedLanguages = [
  // ... existing languages
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
];
```

### Step 3: Test the Implementation

1. Open the website
2. The new language should appear in the language selector
3. Click to switch and verify all text is translated
4. Check browser console for any missing translation warnings

## 🔧 Translation Keys

All translation keys follow a consistent naming convention:

- **Navigation**: `nav-{section}`
- **Sections**: `{section}-title`, `{section}-description`
- **Forms**: `form-{field}`
- **Actions**: `cta-{action}`, `button-{action}`
- **Labels**: `{item}-label`

### Required Keys

Ensure all language files include these essential keys:

```json
{
  "nav-home": "...",
  "nav-about": "...",
  "nav-tech": "...",
  "nav-resume": "...",
  "nav-portfolio": "...",
  "nav-contact": "...",
  "language-label": "...",
  "hero-subtitle": "...",
  "hero-typed": ["...", "...", "..."]
}
```

## 🎨 Styling

The language selector supports responsive design and theming:

```css
.language-switch {
  flex-wrap: wrap;
  max-width: 280px;
  gap: 2px;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 4px;
}

.language-option .flag {
  font-size: 0.9rem;
}
```

## ⚡ Performance

- **Lazy Loading**: Language files are only loaded when needed
- **Caching**: Loaded translations are cached in memory
- **Minimal Bundle**: Only the translator core is included in the main bundle
- **CDN Ready**: Translation files can be served from CDN

## 🔍 Debugging

Enable translation debugging in the browser console:

```javascript
// Check current language
console.log(translator.getCurrentLanguage());

// Check supported languages
console.log(translator.getSupportedLanguages());

// Manually load a language
await translator.setLanguage('es');
```

## 🌐 RTL Support

The system automatically handles RTL languages:

```javascript
// Arabic support example
if (langCode === 'ar') {
  document.documentElement.dir = 'rtl';
  document.body.classList.add('rtl');
} else {
  document.documentElement.dir = 'ltr';
  document.body.classList.remove('rtl');
}
```

## 🛠️ API Reference

### Translator Class Methods

- `init()`: Initialize translator with saved language
- `setLanguage(langCode)`: Switch to specified language
- `loadLanguage(langCode)`: Load language file
- `getCurrentLanguage()`: Get current language code
- `getSupportedLanguages()`: Get array of supported languages
- `getTranslation(key)`: Get translation for specific key

### Events

The system automatically updates:
- DOM elements with `data-translate` attributes
- Typed.js animations
- Document language attributes
- RTL/LTR direction

## 🎯 Best Practices

1. **Consistent Keys**: Use consistent naming for translation keys
2. **Complete Translations**: Ensure all keys exist in every language file
3. **Fallbacks**: English should always be complete as the fallback language
4. **Testing**: Test each language thoroughly, especially special characters
5. **Performance**: Keep translation files reasonably sized
6. **Maintenance**: Use tools to validate translation completeness

## 🔄 Migration from Old System

The old inline translation system has been completely replaced. Benefits:

- ✅ **Scalable**: Easy to add new languages
- ✅ **Maintainable**: Each language in separate file
- ✅ **Performant**: Only load needed languages
- ✅ **Collaborative**: Translators can work independently
- ✅ **Version Control**: Clean diffs for translation changes

## 🤝 Contributing Translations

To contribute a new language:

1. Fork the repository
2. Create language file in `assets/js/i18n/locales/`
3. Add language to `supportedLanguages` array
4. Test thoroughly
5. Submit pull request

Translation quality guidelines:
- Maintain professional tone
- Preserve technical terms appropriately
- Consider cultural context
- Keep similar length where possible for UI consistency 