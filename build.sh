#!/bin/bash
set -e
yarn || true
yarn build-css || true
react-scripts build || true
