import chalk from "chalk";

const time = () => {
  const date = new Date(Date.now());

  return chalk.gray(
    [
      [
        (date.getMonth() + 1).toString().padStart(2, "0"),
        date.getDate().toString().padStart(2, "0"),
      ].join("/"),
      [
        date.getHours().toString().padStart(2, "0"),
        date.getDate().toString().padStart(2, "0"),
        date.getMinutes().toString().padStart(2, "0"),
      ].join(":"),
    ].join(" "),
  );
};

const pad = (s: string) => {
  return s.padEnd(5, " ");
};

export class Logger {
  info(...args: any[]) {
    console.info(`${time()} ${chalk.cyan(pad("Info"))}`, ...args);
  }

  warn(...args: any[]) {
    console.info(`${time()} ${chalk.yellow(pad("Warn"))}`, ...args);
  }

  error(...args: any[]) {
    console.info(`${time()} ${chalk.red(pad("Error"))}`, ...args);
  }
}

export default new Logger();
