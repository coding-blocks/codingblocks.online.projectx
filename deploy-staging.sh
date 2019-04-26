#!/bin/bash

rm -rf dist/
ember build --environment=staging
chmod 600 key.pem

scp -o StrictHostKeyChecking=no -i key.pem -r dist/* $USER@$SERVER:~/frontends/codingblocks.online.projectx/