#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

tsc

# Strip any credentials CI may have put in the remote URL
repo=$(git remote get-url origin | sed 's|//[^@/]*@|//|')
sha=$(git rev-parse HEAD)
VITE_SOURCE="$repo @ $sha" vite build
