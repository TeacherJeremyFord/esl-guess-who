#!/usr/bin/env bash
# Build and push dist/ to the gh-pages branch of TeacherJeremyFord/esl-guess-who (GitHub Pages).
# Commit your changes on master first, then run ./publish.sh
set -euo pipefail
cd "$(dirname "$0")"
npm run build
git push teacher master
TMP=$(mktemp -d); cp -r dist/. "$TMP"; touch "$TMP/.nojekyll"
git -C "$TMP" init -q -b gh-pages && git -C "$TMP" add -A && git -C "$TMP" commit -qm "Publish $(git rev-parse --short HEAD)"
git fetch -q "$TMP" gh-pages
git push -q --force teacher FETCH_HEAD:refs/heads/gh-pages
rm -rf "$TMP"
echo "Published: https://teacherjeremyford.github.io/esl-guess-who/ (live in ~1 minute)"
