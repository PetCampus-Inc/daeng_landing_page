# Careers Apps Script

지원서 Google Sheet 저장과 Discord 알림을 처리하는 Apps Script 코드입니다.

## 연결

`clasp` 로그인 후 이 디렉토리에서 기존 Apps Script 프로젝트를 연결합니다.

```sh
cd apps-script/careers
printf '{"scriptId":"<SCRIPT_ID>","rootDir":"."}\n' > .clasp.json
clasp push
```

`SCRIPT_ID`는 Apps Script 편집기 URL의 배포 ID가 아니라 `프로젝트 설정 -> 스크립트 ID` 값입니다.

## Discord Webhook 설정

Webhook URL은 코드에 커밋하지 않고 Script Properties에 저장합니다.

1. Apps Script 편집기에서 `프로젝트 설정`으로 이동
2. `스크립트 속성`에 속성 추가
3. 이름: `DISCORD_WEBHOOK_URL`
4. 값: 새 Discord webhook URL
5. `doPost`가 호출되면 `sendDiscordApplicationAlert`가 Script Properties에서 URL을 읽어 알림 전송

이미 대화에 노출된 webhook은 Discord에서 재생성하는 것을 권장합니다.
