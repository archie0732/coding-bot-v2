import { createWriteStream, unlink } from "fs";
import fetch from "node-fetch";
import { resolve } from "path";

// https://drive.google.com/file/d/1dXuRhKEKOHJ_tfMMPjRCi-auOdRkpjRA/view?usp=drive_link

export const dlfromDrive = async (token: string) => {
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${token}`;

  const dest = resolve("cache", "hw.cpp");
  const resp = await fetch(downloadUrl);

  if (!resp.ok) {
    throw new Error(
      `Error on https when download data from drive, status ${resp.status}:`,
    );
  }
  const fileStream = createWriteStream(dest);

  return new Promise((resolve, reject) => {
    resp.body!.pipe(fileStream);

    fileStream.on("finish", () => {
      resolve("");
    });

    fileStream.on("error", (err) => {
      unlink(dest, () => reject(err));
    });
  });
};
