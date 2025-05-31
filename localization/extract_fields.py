#!/usr/bin/env python3
"""Extract important fields from translation files"""

import json
from pathlib import Path

from config import IMPORTANT_FIELDS
from path_utils import get_locales_dir, get_localization_dir


def main():
    print("🔍 Extracting important fields...")

    # Directories using absolute paths
    locales_dir = get_locales_dir()
    output_dir = get_localization_dir() / "important_fields"
    output_dir.mkdir(exist_ok=True)

    print(f"📁 Using locales directory: {locales_dir}")
    print(f"📁 Output directory: {output_dir}")

    # Process each language file
    for json_file in locales_dir.glob("*.json"):
        lang = json_file.stem
        print(f"Processing {lang}.json...")

        # Load original translations
        with open(json_file, 'r', encoding='utf-8') as f:
            all_translations = json.load(f)

        # Extract only important fields
        important = {}
        for key in IMPORTANT_FIELDS:
            if key in all_translations:
                important[key] = all_translations[key]

        # Save extracted fields
        output_file = output_dir / f"{lang}.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(important, f, ensure_ascii=False, indent=2)

        print(f"  → Saved {len(important)} fields to {output_file}")

    print("✅ Extraction complete!")


if __name__ == "__main__":
    main()
