#!/bin/bash

red="\e[91m"
default="\e[39m"

printf "$red%s$default\n\n" "Building LocalStream Server..."

node_modules/.bin/babel --presets=es2015,react src/server -d build
