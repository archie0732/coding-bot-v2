import logger from "@/class/logger";
import { resolve } from "path";

// https://drive.google.com/file/d/1dXuRhKEKOHJ_tfMMPjRCi-auOdRkpjRA/view?usp=drive_link

export class DriveDownloadError extends Error {
  url: string;
  status: number;
  error?: unknown;

  constructor(url: string, status: number, error?: unknown) {
    super(`Failed to download from ${url}`);
    this.url = url;
    this.status = status;
    this.error = error;
  }
}

export class DriveWriteDiskError extends Error {
  path: string;

  constructor(path: string, error: Error) {
    super(`Failed to write to disk: ${error.message}`);
    this.path = path;
  }
}

export const dlfromDrive = async (token: string) => {
  const url = `https://drive.google.com/uc?export=download&id=${token}`;

  const dest = resolve(".cache", "hw.cpp");

  let data: ArrayBuffer;
  const resp = await fetch(url);

  if (!resp.ok) {
    throw new DriveDownloadError(url, resp.status);
  }

  try {
    data = await resp.arrayBuffer();
  }
  catch (error) {
    throw new DriveDownloadError(url, resp.status, error);
  }

  const file = Bun.file(dest);

  try {
    await Bun.write(file, data);
    logger.debug("下載成功");
  }
  catch (error) {
    if (!(error instanceof Error)) return;
    new DriveWriteDiskError(dest, error);
  }
};
