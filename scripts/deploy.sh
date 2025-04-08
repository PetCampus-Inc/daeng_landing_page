#!/bin/bash
set -e

cd /home/ubuntu/landingpage

echo "[deploy.sh] Installing dependencies..."
pnpm install --frozen-lockfile

echo "[deploy.sh] Building Next.js app..."
pnpm build

echo "[deploy.sh] Starting PM2 process with ecosystem.config.js..."
pm2 start ecosystem.config.js || pm2 restart ecosystem.config.js

echo "[deploy.sh] Saving PM2 process list for reboot persistence..."
pm2 save

echo "[deploy.sh] Setting PM2 to auto-start on system boot..."
pm2 startup | tail -n 1 | bash