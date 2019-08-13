#!/bin/bash

if [ "$#" -ne 1 ]
then
  echo "Usage: $0 app-name"
  exit 1
fi

FROM="base-admin"
TO=$1
CAP_WORD_FROM="$(echo ${FROM} | gsed -r 's/(^|-)([a-z])/\1\U\2/g')"
CAP_WORD_TO="$(echo ${TO} | gsed -r 's/(^|-)([a-z])/\1\U\2/g')"
TEXT_FROM="$(echo ${CAP_WORD_FROM} | gsed -r 's/-/ /g')"
TEXT_TO="$(echo ${CAP_WORD_TO} | gsed -r 's/-/ /g')"

gsed -i s/${FROM}/${TO}/g package.json
gsed -i "s/${TEXT_FROM}/${TEXT_TO}/g" README.md
gsed -i "s/${TEXT_FROM}/${TEXT_TO}/g" public/manifest.json
gsed -i "s/${TEXT_FROM}/${TEXT_TO}/g" src/components/Home.tsx
