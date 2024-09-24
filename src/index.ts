import "dotenv/config";
import { CoffeeClient } from "./class/client";

const client = new CoffeeClient();

client.login(process.env["TOKEN"]);
