#! /bin/bash
yarn build:server
docker build -t buddhar/abb:latest .
docker push buddhar/abb:latest
plink -ssh -i "E:\Development\React.js\abb\abb1.ppk" root@167.99.11.233 "docker pull buddhar/abb:latest && docker tag buddhar/abb:latest dokku/abb:latest && dokku tags:deploy abb latest"
