#!/bin/bash
cd /home/kavia/workspace/code-generation/chocolate-drop-bakery-website-18151-18174/frontend_react_js
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

