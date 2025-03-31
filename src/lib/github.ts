/* eslint-disable @typescript-eslint/no-explicit-any */

import { AppInfo, CompanyInfo, QnA, LinkType, MemberInfo } from '@/types';

import memberData from '../../contents/members.json';
import companyData from '../../contents/company.json';
import appData from '../../contents/app-info.json';
import qnaData from '../../contents/qna.json';

export const getTeamMembers = () => {
  return new Promise<MemberInfo[]>((resolve) => {
    setTimeout(() => {
      const members = memberData.map((team: any) => {
        const links = Object.entries(team.links).map(([key, value]) => ({
          type: key as LinkType,
          url: value as string,
        }));

        return {
          name: team.name,
          introduction: team.introduction,
          badges: team.badges,
          links,
          imageUrl: team.imageUrl,
        };
      });

      resolve(members);
    }, 0);
  });
};

export const getCompanyInfo = () => {
  return new Promise<CompanyInfo>((resolve) => {
    setTimeout(() => {
      resolve(companyData);
    }, 0);
  });
};

export const getAppInfo = () => {
  return new Promise<AppInfo>((resolve) => {
    setTimeout(() => {
      resolve(appData);
    }, 0);
  });
};

export const getQna = () => {
  return new Promise<QnA[]>((resolve) => {
    setTimeout(() => {
      resolve(qnaData);
    }, 0);
  });
};

// export async function getTeamMembers() {
//   const owner = process.env.GITHUB_OWNER;
//   const repo = process.env.GITHUB_REPO;
//   const path = 'data/team-members.json';
//   const token = process.env.GITHUB_TOKEN;

//   const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

//   const response = await fetch(url, {
//     headers: {
//       Authorization: token ? `token ${token}` : '',
//       Accept: 'application/vnd.github.v3.raw',
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`GitHub API error: ${response.statusText}`);
//   }

//   const data = await response.json();
//   return data;
// }
