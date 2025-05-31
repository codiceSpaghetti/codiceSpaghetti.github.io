# Localization Scripts - Absolute Paths Implementation

## Overview

All localization scripts have been updated to use **absolute paths** instead of relative paths. This means you can now run the scripts from **any directory** without worrying about path issues.

## ✅ What's Been Updated

### Core Changes

1. **New `path_utils.py` module** - Provides intelligent project root detection
2. **All scripts updated** to use absolute path resolution
3. **Enhanced error messages** with full path information
4. **Directory auto-creation** for output folders

### Updated Scripts

- ✅ `translate_website.py` - Main translation script using Lara SDK
- ✅ `extract_fields.py` - Extract important fields for review
- ✅ `review_with_gpt.py` - Review translations with GPT
- ✅ `merge_back.py` - Merge reviewed translations back
- ✅ `run_all.py` - Complete workflow orchestrator
- ✅ `test_paths.py` - Test absolute path resolution

## 🔧 How It Works

### Intelligent Project Root Detection

The `path_utils.py` module automatically finds your project root by looking for:
- `index.html` file
- `assets/` directory

It searches upward from the script location until it finds these markers.

```python
from path_utils import get_project_root, get_locales_dir

# These work from anywhere!
project_root = get_project_root()  # /Users/you/project/
locales_dir = get_locales_dir()    # /Users/you/project/assets/js/i18n/locales/
```

### Path Resolution Functions

| Function | Returns | Description |
|----------|---------|-------------|
| `get_project_root()` | `/path/to/project/` | Main project directory |
| `get_locales_dir()` | `/path/to/project/assets/js/i18n/locales/` | Translation JSON files |
| `get_localization_dir()` | `/path/to/project/localization/` | Python scripts directory |
| `get_absolute_path(*parts)` | `/path/to/project/parts/` | Custom path construction |

## 🚀 Usage Examples

### From Project Root
```bash
cd /Users/you/project/
python localization/translate_website.py --target es
python localization/run_all.py
```

### From Any Directory
```bash
cd /Users/you/some-other-directory/
python /Users/you/project/localization/translate_website.py --target es
python /Users/you/project/localization/run_all.py
```

### From Localization Directory
```bash
cd /Users/you/project/localization/
python translate_website.py --target es
python run_all.py
```

### From Subdirectory
```bash
cd /Users/you/project/some-subdirectory/
python ../localization/translate_website.py --target es
```

## 🧪 Testing the Implementation

Run the test script to verify everything works:

```bash
python localization/test_paths.py
```

**Expected output:**
```
🧪 Testing Absolute Path Resolution
========================================
Current working directory: /Users/you/wherever
📁 Path Resolution:
Project root: /Users/you/project
Locales dir: /Users/you/project/assets/js/i18n/locales
Localization dir: /Users/you/project/localization
✅ Verification:
index.html exists: True
assets dir exists: True
locales dir exists: True
en.json exists: True
📊 Summary:
✅ Core project structure found
✅ All localization scripts found
✅ Translation files found
🎯 You can now run localization scripts from any directory!
```

## 📝 Script-Specific Changes

### `translate_website.py`
- ✅ Uses `get_locales_dir()` for JSON file paths
- ✅ Auto-creates output directories
- ✅ Shows full paths in logging for debugging

### `extract_fields.py`
- ✅ Uses absolute paths for input and output directories
- ✅ Creates `important_fields/` in localization directory

### `review_with_gpt.py`
- ✅ Finds input files using absolute paths
- ✅ Creates `reviewed_fields/` in localization directory

### `merge_back.py`
- ✅ Uses absolute paths for original and reviewed files
- ✅ Creates backups in `localization/backups/`

### `run_all.py`
- ✅ Runs scripts using absolute paths
- ✅ Works regardless of current directory

## 🗂️ Directory Structure

The scripts expect this structure (all paths now resolved absolutely):

```
project-root/
├── index.html                          # Project marker file
├── assets/
│   └── js/
│       └── i18n/
│           ├── translator.js           # Web translator
│           └── locales/               # Translation JSON files
│               ├── en.json
│               ├── es.json
│               └── ...
└── localization/                      # Python scripts (this directory)
    ├── path_utils.py                  # NEW: Path resolution utilities
    ├── config.py                      # Configuration
    ├── translate_website.py           # Main translation script
    ├── extract_fields.py              # Extract important fields
    ├── review_with_gpt.py             # GPT review
    ├── merge_back.py                  # Merge back reviewed
    ├── run_all.py                     # Complete workflow
    ├── test_paths.py                  # NEW: Test absolute paths
    ├── important_fields/              # Extracted fields (auto-created)
    ├── reviewed_fields/               # GPT-reviewed (auto-created)
    └── backups/                       # Backups (auto-created)
```

## 🔍 Debugging

### Check Path Resolution
```bash
python localization/path_utils.py
```

### Debug Individual Scripts
All scripts now show full paths in their output:
```bash
python localization/translate_website.py --target es
# Shows: 📁 Using locales directory: /full/path/to/locales
```

### Common Issues

1. **"Could not find project root"**
   - Ensure `index.html` and `assets/` directory exist
   - The scripts look for these markers to find the project root

2. **"File not found" errors**
   - Run `python localization/test_paths.py` to verify all paths
   - Check that required directories and files exist

3. **Import errors**
   - Ensure you're running scripts with Python from the correct environment
   - All imports are relative within the localization directory

## 💡 Benefits

### For Development
- ✅ **Flexible execution** - Run from any directory
- ✅ **Consistent paths** - No more "file not found" errors
- ✅ **Better debugging** - Full paths shown in output
- ✅ **Auto-creation** - Output directories created automatically

### For Deployment
- ✅ **CI/CD friendly** - Works in any build environment
- ✅ **Container compatible** - Absolute paths work in Docker
- ✅ **Symlink safe** - Resolves actual file locations

### For Collaboration
- ✅ **Team friendly** - Works regardless of workspace setup
- ✅ **IDE agnostic** - Run from terminal, VS Code, PyCharm, etc.
- ✅ **Documentation clear** - Full paths in all error messages

## 🎯 Quick Start

1. **Test the setup:**
   ```bash
   python localization/test_paths.py
   ```

2. **Translate a single language:**
   ```bash
   python localization/translate_website.py --target es
   ```

3. **Run complete workflow:**
   ```bash
   export OPENAI_API_KEY="your-key"
   python localization/run_all.py
   ```

4. **From any directory:**
   ```bash
   cd /anywhere/you/want/
   python /full/path/to/your/project/localization/translate_website.py --target fr
   ```

Your localization scripts now work from anywhere! 🎉 