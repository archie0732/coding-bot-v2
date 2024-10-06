import codeforces from "@/api/codeforces";
import logger from "@/class/logger";

import { CoffeeCommand } from "@/class/command";
import { SlashCommandBuilder, SlashCommandStringOption, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

import type { CodeforcesAPI } from "@/api/codeforces/user";

export default new CoffeeCommand({
  builder: new SlashCommandBuilder()
    .setName("codeforce_user")
    .setNameLocalization("zh-TW", "codeforce個人")
    .setDescription("查看用戶的個人資料")
    .addStringOption(
      new SlashCommandStringOption()
        .setName("username")
        .setNameLocalization("zh-TW", "名稱")
        .setDescription("username in codefroces")
        .setRequired(true)),
  ephemeral: true,
  defer: true,
  async execute(interaction: ChatInputCommandInteraction) {
    const username = interaction.options.getString("codeforcesPorfiles", true);

    try {
      const userPorfiles = await codeforces.getAPI(username);

      const embed = profileEmbed(userPorfiles);

      await interaction.editReply({
        content: `以下是你查詢的結果 ${username}`,
        embeds: [embed],
      });
    }
    catch (error) {
      await interaction.editReply({
        content: "codeforces fetch user profiels error",
      });
      logger.error("codeforces/userPorfiles", error);
    }
  },
});

const profileEmbed = (user: CodeforcesAPI) => {
  if (!user.username) {
    return new EmbedBuilder()
      .setTitle("查無此人")
      .setDescription("沒有在codeforce上找到該使用者\n可能是隱藏、刪除或是修改帳號")
      .setImage(user.url)
      .setFooter({ text: "archie0732's coding-bot with typescript" });
  }

  const embed = new EmbedBuilder()
    .setTitle(`${user.username} 位於 codefoerce 上的個人資料`)
    .setThumbnail(user.avatar)
    .setTimestamp(Date.now())
    .setURL(user.url)
    .setDescription(`- 使用</codeforce_profile:1278292545847165011> 來查詢個人檔案`)
    .setFields(
      {
        name: "🏆 rank",
        value: user.rank,
        inline: true,
      },
      {
        name: "🏅 目前/歷史排名",
        value: `${user.rating.toString()}/${user.max_rating.toString()}`,
        inline: true,
      },
      {
        name: "✅ 解題數量",
        value: `${user.slove.all_time}題`,
        inline: true,
      },
      {
        name: "🕛 創立帳號",
        value: user.created_at,
        inline: true,
      },
      {
        name: "👾 最後登入",
        value: user.last_visit,
        inline: true,
      },
    )
    .setFooter({ text: "archie0732's coding-bot with ts" });

  return embed;
};
