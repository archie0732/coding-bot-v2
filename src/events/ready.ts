import { CoffeeEvent } from "../class/event";
import { Events } from "discord.js";

import logger from "../class/logger";

export default new CoffeeEvent({
  event: Events.ClientReady,
  async once(client) {
    await this.updateCommands();
    logger.info(`Bot is ready ${client.user.tag}`);
  },
});
