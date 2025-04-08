import { getEnv } from '@/utils/getEnv';
import { App } from 'octokit';

const GITHUB_CONTENT_JSON_MAP = {
  MEMBERS: 'members.json',
  COMPANY: 'company.json',
  APP_INFO: 'app-info.json',
  QNA: 'qna.json',
} as const;

type GitHubContent = keyof typeof GITHUB_CONTENT_JSON_MAP;

export async function fetchGitHubContent<T>(content: GitHubContent): Promise<T> {
  const appId = getEnv('GH_APP_ID');
  const privateKey = getEnv('GH_PRIVATE_KEY');
  const installationId = parseInt(getEnv('GH_INSTALLATION_ID'), 10);

  const app = new App({
    appId: appId,
    privateKey: privateKey,
  });

  const octokit = await app.getInstallationOctokit(installationId);

  const { data } = await octokit.rest.repos.getContent({
    owner: getEnv('GH_OWNER'),
    repo: getEnv('GH_REPO'),
    path: `meta/data/${GITHUB_CONTENT_JSON_MAP[content]}`,
  });

  if (Array.isArray(data) || !('content' in data)) {
    throw new Error('파일을 찾을 수 없거나 디렉토리입니다');
  }

  const response = Buffer.from(data.content, 'base64').toString();
  return JSON.parse(response);
}
