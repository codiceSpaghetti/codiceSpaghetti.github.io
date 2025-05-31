#!/usr/bin/env python3
"""Path utilities for localization scripts"""

import os
from pathlib import Path


def get_project_root():
    """
    Get the absolute path to the project root directory.
    This works by finding the directory containing 'index.html' and 'assets' folder.
    """
    # Start from the current script location
    current_dir = Path(__file__).parent.absolute()

    # Look for project root by finding index.html and assets directory
    search_dir = current_dir

    # Go up directories until we find the project root
    for _ in range(10):  # Safety limit to prevent infinite loop
        index_html = search_dir / "index.html"
        assets_dir = search_dir / "assets"

        if index_html.exists() and assets_dir.exists():
            return search_dir

        # Go up one level
        parent = search_dir.parent
        if parent == search_dir:  # Reached filesystem root
            break
        search_dir = parent

    # Fallback: assume script is in localization/ subdirectory
    fallback_root = current_dir.parent
    print(f"⚠️  Could not find project root, using fallback: {fallback_root}")
    return fallback_root


def get_locales_dir():
    """Get the absolute path to the locales directory"""
    return get_project_root() / "assets" / "js" / "i18n" / "locales"


def get_localization_dir():
    """Get the absolute path to the localization directory"""
    return get_project_root() / "localization"


def get_absolute_path(*path_parts):
    """Get absolute path relative to project root"""
    return get_project_root() / Path(*path_parts)


# For debugging
if __name__ == "__main__":
    print(f"Project root: {get_project_root()}")
    print(f"Locales dir: {get_locales_dir()}")
    print(f"Localization dir: {get_localization_dir()}")

    # Verify paths exist
    project_root = get_project_root()
    print(f"\nVerification:")
    print(f"index.html exists: {(project_root / 'index.html').exists()}")
    print(f"assets dir exists: {(project_root / 'assets').exists()}")
    print(f"locales dir exists: {get_locales_dir().exists()}")
