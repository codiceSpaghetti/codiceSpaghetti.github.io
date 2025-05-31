#!/usr/bin/env python3
"""Review translations with GPT"""

import json
import os
import sys
from pathlib import Path

from config import CONTEXT
from openai import OpenAI
from path_utils import get_localization_dir


def review_with_gpt(translations, language):
    """Send translations to GPT for review"""

    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

    prompt = f"""{CONTEXT}

TARGET LANGUAGE: {language}

Please review and correct these translations. Return ONLY the corrected JSON:

{json.dumps(translations, ensure_ascii=False, indent=2)}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an expert translator. Return only corrected JSON."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.1
    )

    # Extract JSON from response
    content = response.choices[0].message.content.strip()
    if "```json" in content:
        content = content.split("```json")[1].split("```")[0].strip()

    return json.loads(content)


def main():
    if len(sys.argv) != 2:
        print("Usage: python review_with_gpt.py <language>")
        print("Example: python review_with_gpt.py es")
        sys.exit(1)

    lang = sys.argv[1]

    # Check OpenAI API key
    if not os.getenv("OPENAI_API_KEY"):
        print("❌ Please set OPENAI_API_KEY environment variable")
        sys.exit(1)

    print(f"🤖 Reviewing {lang} translations with GPT...")

    # Get absolute paths
    localization_dir = get_localization_dir()

    # Load extracted translations
    input_file = localization_dir / "important_fields" / f"{lang}.json"
    if not input_file.exists():
        print(f"❌ File not found: {input_file}")
        print(f"📁 Looking in: {localization_dir / 'important_fields'}")
        sys.exit(1)

    with open(input_file, 'r', encoding='utf-8') as f:
        translations = json.load(f)

    # Review with GPT
    try:
        reviewed = review_with_gpt(translations, lang)

        # Save reviewed translations
        output_dir = localization_dir / "reviewed_fields"
        output_dir.mkdir(exist_ok=True)
        output_file = output_dir / f"{lang}.json"

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(reviewed, f, ensure_ascii=False, indent=2)

        # Show changes
        changes = 0
        for key in translations:
            if key in reviewed and translations[key] != reviewed[key]:
                print(f"  {key}: '{translations[key]}' → '{reviewed[key]}'")
                changes += 1

        if changes == 0:
            print("  ✅ No changes needed")
        else:
            print(f"  📝 Made {changes} changes")

        print(f"✅ Saved to {output_file}")

    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
