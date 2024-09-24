import { readFileSync } from "fs";
import { resolve } from "path";

export const showSoureCode = () => {
  const filePath = resolve("cache", "hw.cpp");
  return readFileSync(filePath, "utf-8");
};
