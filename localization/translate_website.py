#!/usr/bin/env python3
"""
Simple Website Translation with Lara SDK
Minimal script for translating website content

Prerequisites:
1. Install Lara SDK: pip install lara-sdk
2. Set environment variables:
   - LARA_ACCESS_KEY_ID
   - LARA_ACCESS_KEY_SECRET

Usage:
    # Full translation (replaces entire file)
    python translate_website.py
    python translate_website.py --languages "es,fr,de"
    python translate_website.py --source en --target it
    
    # Translate only missing keys (preserves existing translations)
    python translate_website.py --missing-only --target it
    python translate_website.py --missing-only --languages "es,fr,de"
    python translate_website.py --missing-only --source en --target pt
"""

import argparse
import json
import logging
import os
import time
from pathlib import Path

from lara_sdk import Credentials, Translator

# Import our path utilities for absolute path resolution
from path_utils import get_locales_dir

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')
logger = logging.getLogger(__name__)


def setup_lara():
    """Initialize Lara SDK with credentials"""
    access_key_id = os.getenv("LARA_ACCESS_KEY_ID")
    access_key_secret = os.getenv("LARA_ACCESS_KEY_SECRET")

    if not access_key_id or not access_key_secret:
        raise ValueError("Please set LARA_ACCESS_KEY_ID and LARA_ACCESS_KEY_SECRET")

    credentials = Credentials(access_key_id=access_key_id, access_key_secret=access_key_secret)
    return Translator(credentials)


def load_translations(file_path):
    """Load translations from JSON file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        logger.info(f"File {file_path} not found, will create new translation file")
        return {}


def save_translations(translations, file_path):
    """Save translations to JSON file"""
    # Ensure directory exists
    file_path.parent.mkdir(parents=True, exist_ok=True)

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(translations, f, ensure_ascii=False, indent=2)


def translate_text(lara, text, source_lang, target_lang):
    """Translate a single text string"""
    try:
        # Add small delay to avoid rate limiting
        time.sleep(0.1)
        print(f"Translating {text} from {source_lang} to {target_lang}")
        result = lara.translate(
            text,
            source=source_lang,
            target=target_lang,
            content_type='text/plain',
            timeout_ms=5000,
            use_cache=False
        )

        return result.translation

    except Exception as e:
        logger.warning(f"Translation failed for '{text[:30]}...': {e}")
        return text  # Return original on failure


def translate_content(lara, content, source_lang, target_lang, key):
    """Translate content (string, list, or other)"""
    # Preserve multilingual content
    if key == "multilingual-typed":
        return content

    if isinstance(content, str):
        return translate_text(lara, content, source_lang, target_lang)

    elif isinstance(content, list):
        return [
            translate_text(lara, item, source_lang, target_lang) if isinstance(item, str) else item
            for item in content
        ]

    else:
        return content


def convert_language_code(lang_code):
    """Convert simple language codes to full codes"""
    mappings = {
        "en": "en-US",
        "es": "es-ES",
        "it": "it-IT",
        "fr": "fr-FR",
        "de": "de-DE",
        "pt": "pt-PT",
        "ja": "ja-JP",
        "zh": "zh-CN",
        "ar": "ar-SA",
        "ru": "ru-RU"
    }
    return mappings.get(lang_code, f"{lang_code}-{lang_code.upper()}")


def find_missing_keys(source_translations, target_translations):
    """Find keys that exist in source but are missing in target"""
    missing_keys = {}

    for key, value in source_translations.items():
        if key not in target_translations:
            missing_keys[key] = value
            logger.info(f"Missing key found: {key}")

    return missing_keys


def merge_translations(existing_translations, new_translations):
    """Merge new translations with existing ones"""
    merged = existing_translations.copy()
    merged.update(new_translations)
    return merged


def main():
    parser = argparse.ArgumentParser(description="Translate website content using Lara SDK")
    parser.add_argument("--source", default="en", help="Source language (default: en)")
    parser.add_argument("--target", help="Single target language (e.g., 'it')")
    parser.add_argument("--languages", help="Comma-separated target languages (e.g., 'es,it,fr')")
    parser.add_argument("--source-file", help="Source translation file")
    parser.add_argument("--missing-only", action="store_true", help="Only translate missing keys (preserves existing translations)")

    args = parser.parse_args()

    # Determine target languages
    if args.target:
        target_languages = [args.target]
    elif args.languages:
        target_languages = [lang.strip() for lang in args.languages.split(',')]
    else:
        target_languages = ["es", "it"]  # Default

    # Setup paths using absolute path resolution
    locales_dir = get_locales_dir()
    source_file = Path(args.source_file) if args.source_file else locales_dir / f"{args.source}.json"

    try:
        mode = "missing keys only" if args.missing_only else "full translation"
        logger.info(f"🌍 Starting {mode} with Lara SDK")
        logger.info(f"📁 Using locales directory: {locales_dir}")

        # Initialize Lara
        lara = setup_lara()
        logger.info("✅ Lara SDK initialized")

        # Load source translations
        logger.info(f"Loading source translations from {source_file}")
        source_translations = load_translations(source_file)
        logger.info(f"Loaded {len(source_translations)} source translation keys")

        # Convert language codes
        source_lang = convert_language_code(args.source)

        # Translate to each target language
        for target_lang_code in target_languages:
            target_lang = convert_language_code(target_lang_code)
            output_file = locales_dir / f"{target_lang_code}.json"

            logger.info(f"\n{'='*40}")
            logger.info(f"Translating {source_lang} → {target_lang}")
            logger.info(f"Mode: {mode}")
            logger.info(f"Output: {output_file}")
            logger.info(f"{'='*40}")

            if args.missing_only:
                # Load existing target translations
                existing_translations = load_translations(output_file)
                logger.info(f"Loaded {len(existing_translations)} existing translations")

                # Find missing keys
                missing_keys = find_missing_keys(source_translations, existing_translations)

                if not missing_keys:
                    logger.info(f"✅ No missing keys found for {target_lang_code}. Translation is up to date!")
                    continue

                logger.info(f"Found {len(missing_keys)} missing keys to translate")
                translations_to_process = missing_keys
            else:
                # Full translation mode
                translations_to_process = source_translations

            # Translate the keys
            translated = {}
            total = len(translations_to_process)

            for i, (key, value) in enumerate(translations_to_process.items(), 1):
                logger.info(f"[{i}/{total}] {key}")
                translated[key] = translate_content(lara, value, source_lang, target_lang, key)

            # Handle saving based on mode
            if args.missing_only:
                # Merge with existing translations
                existing_translations = load_translations(output_file)
                final_translations = merge_translations(existing_translations, translated)
                logger.info(f"Merged {len(translated)} new translations with {len(existing_translations)} existing ones")
            else:
                # Full replacement
                final_translations = translated

            # Save translated file
            save_translations(final_translations, output_file)
            logger.info(f"✅ Saved translation to {output_file}")

        logger.info(f"\n🎉 Translation complete! Translated to: {', '.join(target_languages)}")

    except Exception as e:
        logger.error(f"❌ Translation failed: {e}")
        raise


if __name__ == "__main__":
    main()
