#!/bin/bash
set -e
npm install || true
npm build-css || true
npm build-js || true
