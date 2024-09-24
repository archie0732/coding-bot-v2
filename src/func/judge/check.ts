import { spawn } from "child_process";
import { resolve } from "path";

export const checkresult = (input: string, expectedOutput: string) =>
  new Promise((r, reject) => {
    const compile = spawn("g++", [
      resolve("./assert/hw.cpp"),
      "-o",
      resolve("./assert/hw"),
    ]);
    let result = "";
    compile.on("close", (code) => {
      if (code !== 0) {
        reject("compiler error");
      }

      const run = spawn(resolve("cache", "hw.cpp"));

      run.stdin.write(input);
      run.stdin.end();

      run.stdout.on("data", (data) => {
        result += data;
      });

      run.on("close", (code) => {
        if (code !== 0) {
          reject("runtime error");
        }

        if (
          result.replaceAll("\\r\\n", "\\n")
          == expectedOutput.replaceAll("\\r\\n", "\\n")
        ) {
          r("ok");
        }
        else {
          r(result);
        }
      });
    });
  });
