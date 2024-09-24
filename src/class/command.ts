import type {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

interface CoffeeCommandOptions {
  builder: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute: (
    interaction: ChatInputCommandInteraction<"cached">
  ) => Promise<void> | void;
}

export class CoffeeCommand {
  builder: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute: (
    interaction: ChatInputCommandInteraction<"cached">
  ) => Promise<void> | void;

  constructor(options: CoffeeCommandOptions) {
    this.builder = options.builder;
    this.execute = options.execute;
  }
}
