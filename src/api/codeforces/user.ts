import { load, type CheerioAPI } from "cheerio";
import fetch from "node-fetch";

export class CodeforcesAPI {
  username: string | null;
  url: string;
  rank: string;
  rating: number;
  slove: {
    all_time: string;
    last_year: string;
    last_mon: string;
  };

  max_rating: number;
  contributions: string;
  friend_of: string;
  avatar: string;
  last_visit: string;
  created_at: string;

  constructor($: CheerioAPI) {
    this.username = $("h1 > a.rated-user").text()?.toString().trim() || null;
    this.url = this.username
      ? `https://codeforces.com/profile/${this.username}`
      : "https://p2.bahamut.com.tw/B/2KU/62/51f5b62c556d7fa8e3a0fa7f821qmzi5.JPG?";
    this.rank = $("div[class='user-rank']").text().toString().trim();
    this.rating = Number($("li:contains('Contest rating:') span[style='font-weight:bold;']").first().text().trim());
    this.slove = {
      all_time: $("div[class='_UserActivityFrame_counterValue']").eq(0).text().split(" ")[0].trim() || "0",
      last_year: $("div[class='_UserActivityFrame_counterValue']").eq(1).text().split(" ")[0].trim() || "0",
      last_mon: $("div[class='_UserActivityFrame_counterValue']").eq(2).text().split(" ")[0].trim() || "0",
    };
    this.max_rating = Number($("span.smaller span[style='font-weight:bold;']").last().text().trim());
    this.friend_of = $("li:contains('Friend of:')").text()?.toString().trim().split(":")[1]?.trim() || "none";
    this.avatar = $("div[style*='float:right'] img").attr("src") || "";
    this.last_visit = $("li:contains('Last visit:') span").text().trim();
    this.created_at = $("li:contains('Registered:') span").text().trim();
    this.contributions = $("li:contains('Contribution:') span").text().toString().trim();
  }
}

export async function getAPI(username: string) {
  const res = await fetch(`https://codeforces.com/profile/${username}/`);

  if (!res.ok) throw new Error(`https status: ${res.status}`);

  return new CodeforcesAPI(load(await res.text()));
}
