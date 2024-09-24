import {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  type ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
} from "discord.js";
import { CoffeeCommand } from "../class/command";

export default new CoffeeCommand({
  builder: new SlashCommandBuilder()
    .setName("judge")
    .setDescription("Judge a file"),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("TA_hw_modal")
      .setTitle("TA auto check hw");

    const textInput1 = new TextInputBuilder()
      .setCustomId("TA_hw_URL")
      .setLabel("Google Drive URL,should be share")
      .setStyle(TextInputStyle.Short);
    const textInput2 = new TextInputBuilder().setCustomId("TA_sample_input").setLabel("input (換行請用\n)").setStyle(TextInputStyle.Short);
    const textInput3 = new TextInputBuilder().setCustomId("TA_except_output").setLabel("except output (換行請用\n)").setStyle(TextInputStyle.Short);

    const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(textInput1);
    const actionRow2 = new ActionRowBuilder<TextInputBuilder>().addComponents(textInput2);
    const actionRow3 = new ActionRowBuilder<TextInputBuilder>().addComponents(textInput3);
    modal.addComponents(actionRow, actionRow2, actionRow3);

    await interaction.showModal(modal);
    const filter = (interaction: ModalSubmitInteraction) => interaction.customId === "TA_hw_modal";
    interaction.awaitModalSubmit({ filter, time: 30_000 }).then((modalInteraction) => {
      const driveURL = modalInteraction.fields.getTextInputValue("TA_hw_URL");
      const input = modalInteraction.fields.getTextInputValue("TA_sample_input");
      const output = modalInteraction.fields.getTextInputValue("TA_except_output");
    });
  },

});
