import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { EmbedBuilder } from "@discordjs/builders";
import { CoffeeCommand } from "@/class/command";

import leetcode from "@/api/leetcode";
import logger from "@/class/logger";

import type { LeetCodeAPI } from "@/api/leetcode/@types/leetcodeAPI";

export default new CoffeeCommand({
  builder: new SlashCommandBuilder()
    .setName("leetcode_profile")
    .setNameLocalization("zh-TW", "leetcode個人")
    .setDescription("取得LeetCode的個人檔案")
    .addStringOption(
      new SlashCommandStringOption()
        .setName("username")
        .setNameLocalization("zh-TW", "使用者名稱")
        .setDescription("Leetcode上的使用名稱")
        .setRequired(true),
    ),
  defer: true,
  ephemeral: false,
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    try {
      // await interaction.deferReply();
      const username = interaction.options.getString("username", true);
      const user = await leetcode.user(username);
      const embed = profileEmbed(user);

      await interaction.editReply({
        content: `以下是你搜尋的結果:  ${user.username}`,
        embeds: [embed],
      });
    }
    catch (e) {
      await interaction.editReply({
        content: "leetcode fetch user profile error",
      });
      logger.error("leetcode/userProfiles:", e);
    }
  },
});

const profileEmbed = (user: LeetCodeAPI) => {
  const embed = new EmbedBuilder()
    .setTitle(`${user.username} 位於 LeetCode 的個人檔案`)
    .setURL(`https://leetcode.com/u/${user.username}/`)
    .setThumbnail(user.userAvatar)
    .setTimestamp(Date.now())
    .setDescription(
      `- 使用 /leetcode_profile 來取得個人檔案\n👾 最近的解題:\n- ${user.recentSummision[0]?.title || "無"} ----- ${
        user.recentSummision[0]?.statusDisplay || "X"
      }\n- ${user.recentSummision[1]?.title || "無"} ----- ${user.recentSummision[1]?.statusDisplay || "X"} \n- ${
        user.recentSummision[2]?.title || "無"
      } ----- ${user.recentSummision[2]?.statusDisplay || "X"}`,
    )
    .addFields(
      {
        name: "⭐ 排名",
        value: user.rank.toString(),
        inline: true,
      },
      {
        name: "🪙 點數",
        value: user.point.toString(),
        inline: true,
      },
      {
        name: "🎈 通過率",
        value: `${(user.acsubmission.acRate * 100).toFixed(2)}%`,
        inline: true,
      },
      {
        name: "🟢 Easy:",
        value: user.acsubmission.Easy.count.toString(),
        inline: true,
      },
      {
        name: "🟠 Meduim:",
        value: user.acsubmission.Medium.count.toString(),
        inline: true,
      },
      {
        name: "🔴 Hard",
        value: user.acsubmission.Hard.count.toString(),
        inline: true,
      },
    )
    .setFooter({ text: "archie0732's coding-bot with ts" });

  return embed;
};
