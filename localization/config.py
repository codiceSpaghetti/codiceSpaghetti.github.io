#!/usr/bin/env python3
"""Configuration for important translation fields"""

# Important short fields that often get mistranslated
IMPORTANT_FIELDS = [
    # Navigation
    "nav-home", "nav-about", "nav-tech", "nav-resume", "nav-portfolio", "nav-contact",

    # Section titles
    "about-title", "tech-title", "resume-title", "portfolio-title", "contact-title",
    "experience-title", "startup-title", "education-title",

    # Form labels
    "form-name", "form-email", "form-subject", "form-message", "form-send",

    # Personal info labels
    "birth-place-label", "email-label", "city-label", "location-label",
    "masters-label", "bachelors-label", "university-label", "languages-label",

    # Roles and positions
    "about-role", "current-role", "startup-role",

    # Locations and personal data
    "birth-place", "city", "university", "location", "languages", "focus"

    # Focus
    "focus-production-title", "focus-production-desc", "tag-realtime", "tag-quality", "tag-data",

    # Tech
    "tech-pytorch", "tech-python", "tech-slurm", "tech-vllm", "tech-transformers", "tech-mongodb", "tech-docker", "tech-git",
]

# Simple context for GPT
CONTEXT = """
This is a personal portfolio website for an AI researcher and engineer.
The person works on machine translation and multilingual AI systems.
These are short, important text fields (navigation, titles, labels) that need natural, professional translations.
Fix any awkward machine translations while keeping the meaning and professional tone.
"""
