import { LinkType, MemberInfo } from '@/components/MemberCard';
import { Culture } from '@/components/TeamCultureGrid';
import { AppInfo, CompanyInfo } from '@/types';

import cultureData from '@/constants/culture.json';
import memberData from '@/constants/members.json';
import companyData from '@/constants/company.json';
import appData from '@/constants/app-info.json';

export const getTeamMembers = () => {
  return new Promise<MemberInfo[]>((resolve) => {
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    }, 1000);
  });
};

export const getTeamCulture = () => {
  return new Promise<Culture[]>((resolve) => {
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cultures = cultureData.map((team: any) => ({
        id: team.id,
        title: team.title,
        description: team.description,
        textColor: team.textColor,
        imageUrl: team.imageUrl,
      }));

      resolve(cultures);
    }, 400);
  });
};

export const getCompanyInfo = () => {
  return new Promise<CompanyInfo>((resolve) => {
    setTimeout(() => {
      resolve(companyData);
    }, 400);
  });
};

export const getAppInfo = () => {
  return new Promise<AppInfo>((resolve) => {
    setTimeout(() => {
      resolve(appData);
    }, 400);
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
