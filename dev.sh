#!/bin/bash
(cd ~/Workspace/Abierre/apiaccess && npm run build)
scp -r ~/Workspace/Abierre/apiaccess/dist/* dev:/usr/local/docroot/play.abierre.com/dist
