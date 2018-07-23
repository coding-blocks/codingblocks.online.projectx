#!/bin/bash

rm -rf dist/
ember build --environment=production
chmod 600 key.pem

scp -o StrictHostKeyChecking=no -i key.pem -r dist/* $USER@$SERVER:~/frontends/codingblocks.online.projectx/new/
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "rm -rf ~/frontends/codingblocks.online.projectx/old/*;"
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "cp -r ~/frontends/codingblocks.online.projectx/current/* ~/frontends/codingblocks.online.projectx/old/;"
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "rm -rf ~/frontends/codingblocks.online.projectx/current/*;"
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "cp -r ~/frontends/codingblocks.online.projectx/new/* ~/frontends/codingblocks.online.projectx/current/*;"
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "rm -rf ~/frontends/codingblocks.online.projectx/new/*;"