import { LeetCode } from "@leetnotion/leetcode-api";

import type { LeetCodeAPI } from "./@types/leetcodeAPI";

export async function user(username: string): Promise<LeetCodeAPI> {
  const leetcode = new LeetCode();
  const user = await leetcode.user(username);

  if (user === null) throw new Error("can not find the user");

  const acsub = user.matchedUser?.submitStats;

  return {
    username: user.matchedUser?.username || "",
    realname: user.matchedUser?.profile.realName || "",
    userAvatar: user.matchedUser?.profile.userAvatar || "",
    rank: user.matchedUser?.profile.ranking || 0,
    point: user.matchedUser?.contributions.points || 0,
    acsubmission: {
      All: {
        count: user.matchedUser?.submitStats.acSubmissionNum[0].count || 0,
        submissions: user.matchedUser?.submitStats.acSubmissionNum[0].submissions || 0,
      },
      Easy: {
        count: acsub?.acSubmissionNum[1].count || 0,
        submissions: acsub?.acSubmissionNum[1].submissions || 0,
      },
      Medium: {
        count: acsub?.acSubmissionNum[2].count || 0,
        submissions: acsub?.acSubmissionNum[2].submissions || 0,
      },
      Hard: {
        count: acsub?.acSubmissionNum[3].count || 0,
        submissions: acsub?.acSubmissionNum[3].submissions || 0,
      },
      acRate: (acsub?.acSubmissionNum[0].count || 1) / (acsub?.acSubmissionNum[0].submissions || 1),
    },
    recentSummision: user.recentSubmissionList || [
      {
        title: "",
        titleSlug: "",
        timestamp: "",
        statusDisplay: "",
        lang: "",
      },
    ],
  };
}
