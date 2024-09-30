import "dotenv/config";
import { CoffeeClient } from "./class/client";

const client = new CoffeeClient();

await client.login(process.env["TOKEN"]);
