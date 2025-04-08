#!/bin/bash
set -e

# 에러 발생 시 로깅
function handle_error {
  echo "[ERROR] 배포 실패: $BASH_COMMAND"
  exit 1
}
trap 'handle_error' ERR

# 배포 디렉토리 확인 및 권한 설정
echo "[deploy.sh] 디렉토리 권한 설정 중..."
sudo mkdir -p /home/ubuntu/landingpage
sudo chown -R ubuntu:ubuntu /home/ubuntu/landingpage
cd /home/ubuntu/landingpage

# 종속성 설치 및 빌드
echo "[deploy.sh] 종속성 설치 중..."
pnpm install --frozen-lockfile

echo "[deploy.sh] Next.js 앱 빌드 중..."
pnpm build

# PM2로 애플리케이션 시작
echo "[deploy.sh] PM2로 애플리케이션 시작 중..."
pm2 start ecosystem.config.js || pm2 restart ecosystem.config.js

echo "[deploy.sh] PM2 설정 저장 중..."
pm2 save

echo "[deploy.sh] PM2 시스템 시작 설정 중..."
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu

echo "[deploy.sh] 배포 완료!"