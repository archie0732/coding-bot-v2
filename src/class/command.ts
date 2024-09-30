import type {
  ChatInputCommandInteraction,
  ModalBuilder,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

interface CoffeeCommandOptions {
  builder: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  defer: boolean;
  ephemeral: boolean;
  modals?: Record<string, ModalBuilder>;
  execute: (
    interaction: ChatInputCommandInteraction<"cached">
  ) => Promise<void> | void;
  onModelSubmit?: (
    interaction: ModalSubmitInteraction<"cached">,
    modelId: string,
  ) => Promise<void> | void;
}

export class CoffeeCommand {
  builder: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  defer: boolean;
  ephemeral: boolean;
  modals?: Record<string, ModalBuilder>;
  execute: (
    interaction: ChatInputCommandInteraction<"cached">
  ) => Promise<void> | void;

  onModelSubmit?: (
    interaction: ModalSubmitInteraction<"cached">,
    modelId: string,
  ) => Promise<void> | void;

  constructor(options: CoffeeCommandOptions) {
    this.builder = options.builder;
    this.defer = options.defer;
    this.ephemeral = options.ephemeral;
    this.modals = options.modals;
    this.execute = options.execute;
    this.onModelSubmit = options.onModelSubmit;
  }
}
