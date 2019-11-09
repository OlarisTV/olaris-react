#!/bin/bash
set -e
yarn config set cache-folder .yarn
yarn || true
yarn build-css || true
yarn build-js || true
