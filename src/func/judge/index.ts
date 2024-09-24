import { EmbedBuilder, type ChatInputCommandInteraction } from "discord.js";
import { checkresult } from "./check";
import { dlfromDrive } from "./dl";
import { resolve } from "path";

export const TAjudge = async (interaction: ChatInputCommandInteraction, input: string, output: string, url: string) => {
  await dlfromDrive(url.split("/")[5]);
  const result = await checkresult(input, output);
  let embed;
  if (result === "ok") {
    embed = new EmbedBuilder().setTitle("Judge Result: Acept").setDescription("good asian! A++").setThumbnail(resolve("assert", "APlus.jpg")).setImage(resolve("assert", "haveC")).setFooter({ text: "archie0732's coffee bot" });
  }
  else if (result === "compiler" || result === "runtime error") {
    embed = new EmbedBuilder().setTitle(`Judge Result: ${result}`).setDescription("Failure ~").setThumbnail(resolve("assert", "f.jpg")).setImage(resolve("assert", "Failure Steve.jpg")).setFooter({ text: "arhie0732's coffee bot" });
  }
  else {
    embed = new EmbedBuilder().setTitle("Judge Result: Wrong Answer").setDescription(`- Except output:\n${JSON.stringify(output)}`);
  }
};
