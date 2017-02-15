#!/bin/bash

red="\e[91m"
default="\e[39m"

./scripts/build-server.sh
printf "\n"
./scripts/build-client.sh

printf "\n%s\n%s$red%s$default%s\n" "Ready to go!" "Use " "npm start" " to start the server."
