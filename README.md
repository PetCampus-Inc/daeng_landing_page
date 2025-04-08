# 🐶 똑독 랜딩페이지
Next.js 15 + React 19 기반으로 제작되었으며, AWS 인프라(GitHub Actions, S3, EC2, CodeDeploy, PM2)를 활용해 CI/CD가 구성되어 있습니다.

<br>

## 📚 Tech Stack
<div align="center">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white">
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/TailwindCSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/FramerMotion-EF007F?style=for-the-badge&logo=framer&logoColor=white">
  <img src="https://img.shields.io/badge/Shadcn-000000?style=for-the-badge&logo=shadcnui&logoColor=white">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black">
  <br>
  <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">
  <img src="https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
  <img src="https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
  <img src="https://img.shields.io/badge/AWS_ROUTE_53-8C4FFF?style=for-the-badge&logo=amazonroute53&logoColor=white">
  <img src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white">
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
</div>

<br>

## 📁 Project Structure

``` yaml
📦src
├── 📂 app                 # 앱 라우터 엔트리 포인트
├── 📂 assets
│   ├── 📂 fonts           # 폰트 (프리텐다드)
│   └── 📂 icons           # 아이콘 (JSX)
├── 📂 components          # 공통 컴포넌트
├── 📂 constants           # 상수 정의 (텍스트, URL 등)
├── 📂 feature
│   ├── 📂 main            # 메인 페이지 컴포넌트
│   └── 📂 team            # 팀 소개 페이지 컴포넌트
├── 📂 hooks               # 커스텀 React Hook
├── 📂 lib                 # 외부 API, 라이브러리 설정 등 유틸성 모듈
├── 📂 styles
│   ├── 📜 globals.css     # 전역 스타일
│   └── 📂 theme           # 스타일 테마 (타이포그래피, 컬러 등)
├── 📂 types               # 전역 타입
└── 📂 utils               # 유틸리티 함수
```

<br>

## 🚀 CI/CD
Github Actions + EC2 + S3 + CodeDeploy + PM2

### Workflow

1. `main` 브랜치에 Push 시 자동 배포 시작
2. GitHub Actions에서 Next.js 앱을 빌드 후 `.next`, 설정 파일 등을 압축
3. 압축된 zip 파일을 S3 버킷에 업로드
4. AWS CodeDeploy가 zip 파일을 EC2로 전송 및 압축 해제
5. `appspec.yml` → `scripts/deploy.sh` 실행 → PM2로 앱 재시작
