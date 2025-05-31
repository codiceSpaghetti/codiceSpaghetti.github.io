#!/usr/bin/env python3
"""Run the complete translation review workflow"""

import os
import subprocess
import sys
from pathlib import Path

from path_utils import get_localization_dir


def run_script(script_name, args=[]):
    """Run a Python script from the localization directory"""
    localization_dir = get_localization_dir()
    script_path = localization_dir / script_name

    if not script_path.exists():
        print(f"❌ Script not found: {script_path}")
        return False

    cmd = [sys.executable, str(script_path)] + args
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd)
    return result.returncode == 0


def main():
    print("🚀 Translation Review Workflow")
    print("="*35)

    # Get absolute paths for debug info
    localization_dir = get_localization_dir()
    print(f"📁 Working from localization directory: {localization_dir}")

    # Check OpenAI API key
    if not os.getenv("OPENAI_API_KEY"):
        print("❌ Please set OPENAI_API_KEY environment variable")
        print("   export OPENAI_API_KEY='your-key-here'")
        sys.exit(1)

    # Get languages to process
    if len(sys.argv) > 1:
        languages = sys.argv[1].split(',')
    else:
        languages = ['es', 'it', 'fr', 'de']  # Default languages

    print(f"Languages: {', '.join(languages)}")

    # Step 1: Extract important fields
    print("\n1️⃣  Extracting important fields...")
    if not run_script("extract_fields.py"):
        print("❌ Extraction failed")
        sys.exit(1)

    # Step 2: Review each language with GPT
    print("\n2️⃣  Reviewing with GPT...")
    for lang in languages:
        print(f"\n   Reviewing {lang}...")
        if not run_script("review_with_gpt.py", [lang]):
            print(f"❌ Review failed for {lang}")
            continue

    # Step 3: Merge back into original files
    print("\n3️⃣  Merging back...")
    for lang in languages:
        print(f"\n   Merging {lang}...")
        if not run_script("merge_back.py", [lang]):
            print(f"❌ Merge failed for {lang}")
            continue

    print("\n🎉 Workflow complete!")
    print(f"📁 Backups saved in: {localization_dir / 'backups'}")


if __name__ == "__main__":
    main()
