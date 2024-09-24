import { Client, Collection, GatewayIntentBits } from "discord.js";
import { resolve } from "path";

import commands from "../commands";
import events from "../events";
import logger from "./logger";

import type { CoffeeCommand } from "./command";

export class CoffeeClient extends Client {
  commands = new Collection<string, CoffeeCommand>();

  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds],
    });
    for (const command of commands) {
      this.commands.set(command.builder.name, command);
    }
    for (const event of events) {
      const on = event.on;
      if (typeof on == "function") {
        this.on(event.event, (...args) => on.apply(this, args));
      }
      const once = event.once;
      if (typeof once == "function") {
        this.once(event.event, (...args) => once.apply(this, args));
      }
    }
  }

  async updateCommands() {
    const data = this.commands.map(c => c.builder.toJSON());

    const hash = new Bun.CryptoHasher("md5")
      .update(JSON.stringify(data))
      .digest("hex");

    const file = Bun.file(resolve(".cache", "COMMANDS"));

    if (await file.exists()) {
      const old = await file.text();
      if (old == hash) return;
    }

    logger.info("updating commands");

    const guild = this.guilds.cache.get(process.env["GUILD"]!);

    if (!guild) {
      return logger.error("guild not found");
    }

    await guild.commands.set(data);
    await Bun.write(file, hash);
  }
}
