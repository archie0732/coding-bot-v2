import { codeBlock, EmbedBuilder, Events } from "discord.js";
import { CoffeeEvent } from "../class/event";
import logger from "../class/logger";

export default new CoffeeEvent({
  event: Events.InteractionCreate,
  async on(interaction) {
    if (!interaction.inCachedGuild()) return;
    if (!interaction.isChatInputCommand()) return;

    try {
      const command = this.commands.get(interaction.commandName);

      if (!command) return;

      if (command.defer && !command.modals) {
        await interaction.deferReply({
          ephemeral: command.ephemeral,
        });
      }

      await command.execute.call(this, interaction);
    }
    catch (error) {
      if (!(error instanceof Error)) return;

      const payload = {
        content: "oh what a beautiful error!",
        embeds: [
          new EmbedBuilder()
            .setDescription(codeBlock("js", error.message))
            .setTimestamp(),
        ],
      };

      if (interaction.replied) {
        void interaction.editReply(payload).catch(e => void e);
      }
      else {
        void interaction.reply(payload).catch(e => void e);
      }

      logger.error(error);
    }
  },
});
