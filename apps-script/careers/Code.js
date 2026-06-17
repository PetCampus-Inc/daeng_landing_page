const SPREADSHEET_ID = '18AKmUTxlSRpFGj8gVDZpKveDDkDiQpvZisoSZOfoJ_M';
const SHEET_NAME = '시트1';

function doPost(e) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('시트 탭을 찾을 수 없습니다.');
  }

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date().toLocaleString('ko-KR'),
    data.name || '',
    data.phone || '',
    data.email || '',
    data.gender || '',
    data.residence || '',
    data.position || '',
    data.employment || '',
    data.portfolio || '',
    data.introduction || '',
  ]);

  sendDiscordApplicationAlert(data);

  return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function sendDiscordApplicationAlert(data) {
  const webhookUrl = PropertiesService.getScriptProperties().getProperty('DISCORD_WEBHOOK_URL');

  if (!webhookUrl) {
    console.warn('DISCORD_WEBHOOK_URL이 설정되지 않았습니다.');
    return;
  }

  const payload = {
    embeds: [
      {
        title: '새 지원자가 접수되었습니다',
        color: 5763719,
        fields: [
          { name: '지원여부', value: '접수 완료', inline: true },
          { name: '지원 포지션', value: data.position || '-', inline: true },
          { name: '이름', value: data.name || '-', inline: true },
          { name: '연락처', value: data.phone || '-', inline: true },
          { name: '이메일', value: data.email || '-', inline: false },
          { name: '재직여부', value: data.employment || '-', inline: true },
          { name: '거주지역', value: data.residence || '-', inline: true },
          { name: '포트폴리오', value: data.portfolio || '-', inline: false },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  UrlFetchApp.fetch(webhookUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
}
