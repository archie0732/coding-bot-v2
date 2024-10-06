export interface LeetCodeAPI {
  username: string;
  realname: string;
  userAvatar: string;
  rank: number;
  point: number;
  acsubmission: {
    All: {
      count: number;
      submissions: number;
    };
    Easy: {
      count: number;
      submissions: number;
    };
    Medium: {
      count: number;
      submissions: number;
    };
    Hard: {
      count: number;
      submissions: number;
    };
    acRate: number;
  };
  recentSummision: {
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
  }[];
}
