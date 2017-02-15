#!/bin/bash

getopts w opt # if -w is supplied, webpack should watch

red="\e[91m"
default="\e[39m"

printf "$red%s$default\n" "Building LocalStream Client..."

if [ $opt = "w" ]; then
	node_modules/.bin/webpack --config webpack.config.js --watch
else
	printf "\n"
	node_modules/.bin/webpack --config webpack.config.js
fi
