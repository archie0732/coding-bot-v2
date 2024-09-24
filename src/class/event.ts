import type { ClientEvents } from "discord.js";
import type { CoffeeClient } from "./client";

export type Events = keyof ClientEvents;

export interface CoffeeEventOptions<T extends Events> {
  event: T;
  on?: (this: CoffeeClient, ...args: ClientEvents[T]) => Promise<void> | void;
  once?: (this: CoffeeClient, ...args: ClientEvents[T]) => Promise<void> | void;
}

export class CoffeeEvent<T extends Events> {
  event: T;
  on?: (this: CoffeeClient, ...args: ClientEvents[T]) => Promise<void> | void;
  once?: (this: CoffeeClient, ...args: ClientEvents[T]) => Promise<void> | void;

  constructor(options: CoffeeEventOptions<T>) {
    this.event = options.event;
    this.on = options.on;
    this.once = options.once;
  }
}
