#!/bin/bash
set -e
npm install || true
npm run build-css || true
npm run build-js || true
