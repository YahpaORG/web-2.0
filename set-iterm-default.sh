#!/usr/bin/env bash
# Sets iTerm2 as the default app for common coding file extensions.
# Note: iTerm2 is a terminal — it won't actually "edit" these files when opened.
set -e
BUNDLE=com.googlecode.iterm2
EXTS=(py js mjs cjs ts tsx jsx json jsonc md html htm css scss cpp cc cxx c h hpp sh bash zsh go rs java rb php swift kt sql yml yaml toml xml ipynb vue svelte lua)

command -v duti >/dev/null || { echo "Install duti first: brew install duti" >&2; exit 1; }

for e in "${EXTS[@]}"; do duti -s "$BUNDLE" ".$e" all; done
echo "Set iTerm2 as default for ${#EXTS[@]} extensions."
