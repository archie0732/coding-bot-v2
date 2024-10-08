import type { AnySelectMenuInteraction, ApplicationCommandOptionChoiceData, AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction, ModalSubmitInteraction } from "discord.js";
import type { ModalBuilder, SharedSlashCommand } from "@discordjs/builders";
import type { CoffeeClient } from "@/class/client";

export interface CoffeeCommandOptions {
  builder: SharedSlashCommand;
  defer: boolean;
  ephemeral: boolean;
  modals?: Record<string, ModalBuilder>;
  execute: (this: CoffeeClient, interaction: ChatInputCommandInteraction<"cached">) => void | Promise<void>;
  onAutocomplete?: (this: CoffeeClient, interaction: AutocompleteInteraction<"cached">) => readonly ApplicationCommandOptionChoiceData[] | Promise<readonly ApplicationCommandOptionChoiceData[]>;
  onButton?: (this: CoffeeClient, interaction: ButtonInteraction<"cached">, buttonId: string) => void | Promise<void>;
  onModalSubmit?: (this: CoffeeClient, interaction: ModalSubmitInteraction<"cached">, modalId: string) => void | Promise<void>;
  onSelectMenu?: (this: CoffeeClient, interaction: AnySelectMenuInteraction<"cached">, menuId: string) => void | Promise<void>;
}

export class CoffeeCommand {
  builder: SharedSlashCommand;
  defer: boolean;
  ephemeral: boolean;
  modals?: Record<string, ModalBuilder>;
  execute: (this: CoffeeClient, interaction: ChatInputCommandInteraction<"cached">) => void | Promise<void>;
  onAutocomplete?: (this: CoffeeClient, interaction: AutocompleteInteraction<"cached">) => readonly ApplicationCommandOptionChoiceData[] | Promise<readonly ApplicationCommandOptionChoiceData[]>;
  onButton?: (this: CoffeeClient, interaction: ButtonInteraction<"cached">, buttonId: string) => void | Promise<void>;
  onModalSubmit?: (this: CoffeeClient, interaction: ModalSubmitInteraction<"cached">, modalId: string) => void | Promise<void>;
  onSelectMenu?: (this: CoffeeClient, interaction: AnySelectMenuInteraction<"cached">, menuId: string) => void | Promise<void>;

  constructor(options: CoffeeCommandOptions) {
    this.builder = options.builder;
    this.defer = options.defer;
    this.ephemeral = options.ephemeral;
    this.modals = options.modals;
    this.execute = options.execute;
    this.onAutocomplete = options.onAutocomplete;
    this.onButton = options.onButton;
    this.onModalSubmit = options.onModalSubmit;
    this.onSelectMenu = options.onSelectMenu;
  }
}
