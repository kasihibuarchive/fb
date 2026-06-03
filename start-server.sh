#!/bin/bash
cd /home/z/my-project
while true; do
  npx next dev -p 3000 --turbopack </dev/null >>/home/z/my-project/dev.log 2>&1
  echo "[$(date)] Restarting..." >>/home/z/my-project/dev.log
  sleep 1
done
