import { EmbedBuilder, AttachmentBuilder, codeBlock } from "discord.js";
import { checkresult, JudgeCompileError, JudgeRuntimeError, JudgeTimeLimitExceededError, JudgeWrongAnswerError } from "./check";
import { dlfromDrive, DriveDownloadError, DriveWriteDiskError } from "./dl";
import { assetAPlus, assetF, assethaveC, assetSteve, assetYukiImage, aasetAniYa } from "../../utils/assets";
import logger from "../../class/logger";

export const TAjudge = async (input: string, output: string, url: string) => {
  let embed;
  const files: AttachmentBuilder[] = [];

  try {
    await dlfromDrive(url.split("/")[5]);
    await checkresult(input, output);

    embed = new EmbedBuilder()
      .setTitle("Accept")
      .setDescription("good asian! A++")
      .setThumbnail(assetAPlus.url)
      .setImage(assethaveC.url)
      .setFooter({ text: "archie0732's coffee bot" });
  }
  catch (e) {
    if (!(e instanceof Error)) throw e;

    switch (e.constructor) {
      case DriveDownloadError: {
        const error = e as DriveDownloadError;

        files.push(assetYukiImage.attachment);

        embed = new EmbedBuilder()
          .setTitle("Drive Download Error")
          .setDescription(`可能是因為未開啟共享檔案，或未知錯誤:\n狀態碼: ${error.status}`)
          .setImage(assetYukiImage.url);
        break;
      }

      case DriveWriteDiskError: {
        const error = e as DriveWriteDiskError;
        embed = new EmbedBuilder()
          .setTitle("Drive Wrute Disk Error")
          .setDescription(`檔案寫入時發生問題，請稍後再試\n${error.message}`);
        break;
      }

      case JudgeCompileError: {
        files.push(assetF.attachment);
        files.push(assetSteve.attachment);
        const error = e as JudgeCompileError;
        embed = new EmbedBuilder()
          .setTitle("Compile Error")
          .setDescription(`error on: ${error.error}`)
          .setThumbnail(assetF.url)
          .setImage(assetSteve.url)
          .setFooter({ text: "arhie0732's coffee bot" });
        break;
      }

      case JudgeRuntimeError: {
        files.push(assetF.attachment);
        files.push(assetSteve.attachment);
        const error = e as JudgeRuntimeError;
        embed = new EmbedBuilder()
          .setTitle(`${error.message}`)
          .setDescription("Failure ~")
          .setThumbnail(assetF.url)
          .setImage(assetSteve.url)
          .setFooter({ text: "arhie0732's coffee bot" });
        break;
      }

      case JudgeWrongAnswerError: {
        files.push(aasetAniYa.attachment);
        files.push(assetYukiImage.attachment);
        const error = e as JudgeWrongAnswerError;
        embed = new EmbedBuilder()
          .setTitle("Wrong Answer")
          .setDescription(`- Expected output:\n${codeBlock(error.expected)}\nReceive output:\n${codeBlock(error.got)}`)
          .setThumbnail(aasetAniYa.url)
          .setImage(assetYukiImage.url)
          .setFooter({ text: "archie0732's coffee bot" });
        break;
      }

      case JudgeTimeLimitExceededError: {
        const error = e as JudgeTimeLimitExceededError;
        embed = new EmbedBuilder()
          .setTitle("Time Limit ExceedeError")
          .setDescription(`超時了，哈哈\n${error.limit}`);
        break;
      }

      default: {
        const error = e;
        embed = new EmbedBuilder()
          .setTitle("Unknow Error")
          .setDescription(`wow!\n${error.message}`);
        break;
      }
    }

    logger.error("aaaaaa", e);
  }

  return {
    embeds: [embed], files,
  };
};
