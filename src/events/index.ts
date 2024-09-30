import type { CoffeeEvent, Events } from "../class/event";

import ready from "../events/ready";
import interactionCreate from "./interactionCreate";
import modelSubmit from "./modelSubmit";

export default [ready, interactionCreate, modelSubmit] as CoffeeEvent<Events>[];
