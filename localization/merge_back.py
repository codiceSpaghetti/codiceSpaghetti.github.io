#!/usr/bin/env python3
"""Merge reviewed translations back into original files"""

import json
import shutil
import sys
from datetime import datetime
from pathlib import Path

from path_utils import get_locales_dir, get_localization_dir


def main():
    if len(sys.argv) != 2:
        print("Usage: python merge_back.py <language>")
        print("Example: python merge_back.py es")
        sys.exit(1)

    lang = sys.argv[1]

    print(f"🔄 Merging reviewed {lang} translations...")

    # Get absolute paths
    locales_dir = get_locales_dir()
    localization_dir = get_localization_dir()

    # File paths
    original_file = locales_dir / f"{lang}.json"
    reviewed_file = localization_dir / "reviewed_fields" / f"{lang}.json"

    print(f"📁 Original file: {original_file}")
    print(f"📁 Reviewed file: {reviewed_file}")

    if not original_file.exists():
        print(f"❌ Original file not found: {original_file}")
        sys.exit(1)

    if not reviewed_file.exists():
        print(f"❌ Reviewed file not found: {reviewed_file}")
        sys.exit(1)

    # Load files
    with open(original_file, 'r', encoding='utf-8') as f:
        original = json.load(f)

    with open(reviewed_file, 'r', encoding='utf-8') as f:
        reviewed = json.load(f)

    # Create backup
    backup_dir = localization_dir / "backups"
    backup_dir.mkdir(exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = backup_dir / f"{lang}_{timestamp}.json"
    shutil.copy2(original_file, backup_file)
    print(f"📋 Backup created: {backup_file}")

    # Merge reviewed translations into original
    changes = 0
    for key, value in reviewed.items():
        if key in original and original[key] != value:
            print(f"  {key}: '{original[key]}' → '{value}'")
            original[key] = value
            changes += 1

    if changes == 0:
        print("  ✅ No changes to merge")
        return

    # Save updated file
    with open(original_file, 'w', encoding='utf-8') as f:
        json.dump(original, f, ensure_ascii=False, indent=2)

    print(f"✅ Merged {changes} changes into {original_file}")


if __name__ == "__main__":
    main()
