import { Events } from "discord.js";
import { CoffeeEvent } from "../class/event";

import logger from "../class/logger";

export default new CoffeeEvent({
  event: Events.InteractionCreate,
  async on(interation) {
    if (!interation.inCachedGuild()) return;
    if (!interation.isModalSubmit()) return;

    try {
      const [commandName, modelId] = interation.customId.split("-");
      const command = this.commands.get(commandName);

      if (!command) return;
      if (!command.onModelSubmit) return;

      if (command.defer) {
        await interation.deferUpdate();
      }

      await command.onModelSubmit.call(this, interation, modelId);
    }
    catch (error) {
      logger.error(error);
    }
  },
});
