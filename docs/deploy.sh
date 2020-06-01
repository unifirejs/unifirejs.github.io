#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/unifirejs master
