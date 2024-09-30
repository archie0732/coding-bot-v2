import { resolve } from "path";
import { AttachmentBuilder } from "discord.js";

const assetsFolder = resolve("assets");

const createImageAsset = (filename: string) => ({
  attachment: new AttachmentBuilder(resolve(assetsFolder, filename)).setName(filename),
  url: `attachment://${filename}`,
});

export const assetYukiImage = createImageAsset("Yuki.png");
export const assetSteve = createImageAsset("StevenFailure.jpg");
export const assetF = createImageAsset("f.jpg");
export const aasetAniYa = createImageAsset("AniYa.png");
export const assetAPlus = createImageAsset("APlus.jpg");
export const assethaveC = createImageAsset("haveC.jpeg");
