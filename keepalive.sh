#!/bin/bash
while true; do
  NODE_OPTIONS="--max-old-space-size=384" npx next dev -p 3000 --turbopack 2>&1
  echo "[$(date)] Restarting..." >> /home/z/my-project/dev.log
  sleep 2
done
