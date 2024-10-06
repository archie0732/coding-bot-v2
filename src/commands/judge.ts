import {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from "discord.js";
import { CoffeeCommand } from "../class/command";
import { TAjudge } from "../func/judge/index";

const modals = {
  TA_hw_modal: new ModalBuilder()
    .setCustomId("judge-TA_hw_modal")
    .setTitle("TA auto check hw")
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>()
        .addComponents(new TextInputBuilder()
          .setCustomId("TA_hw_URL")
          .setLabel("Google Drive URL,should be share")
          .setStyle(TextInputStyle.Short)
          .setRequired(true)),
      new ActionRowBuilder<TextInputBuilder>()
        .addComponents(new TextInputBuilder()
          .setCustomId("TA_sample_input")
          .setLabel("input (換行請用\n)")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)),
      new ActionRowBuilder<TextInputBuilder>()
        .addComponents(new TextInputBuilder()
          .setCustomId("TA_except_output")
          .setLabel("except output (換行請用\n)")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)),
    ),
};

export default new CoffeeCommand({
  builder: new SlashCommandBuilder()
    .setName("judge")
    .setDescription("Judge a file"),
  defer: true,
  ephemeral: false,
  modals,
  async execute(interaction) {
    await interaction.showModal(modals.TA_hw_modal);
  },
  async onModalSubmit(interaction) {
    const driveURL = interaction.fields.getTextInputValue("TA_hw_URL");
    const input = interaction.fields.getTextInputValue("TA_sample_input");
    const output = interaction.fields.getTextInputValue("TA_except_output");

    const payload = await TAjudge(input, output, driveURL);

    await interaction.followUp({
      ...payload,
      content: "Judge Result",
    });
  },
});
