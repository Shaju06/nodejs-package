#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import { analyze } from "./analyze.js";

const program = new Command();

program
  .name("detect-api")
  .description("🕵️ Analyze any API endpoint for performance, structure, and security.")
  .argument("<url>", "API endpoint to analyze")
  .option("-s, --save <file>", "Save report as JSON")
  .action(async (url, options) => {
    const spinner = ora(`Analyzing ${url}...`).start();
    try {
      const result = await analyze(url);
      spinner.succeed("Analysis complete!\n");

      console.log(chalk.cyanBright(`URL:`), url);
      console.log(chalk.green(`Status:`), result.status);
      console.log(chalk.yellow(`Time:`), result.time);
      console.log(chalk.magenta(`Size:`), result.size);
      console.log(chalk.blue(`Content-Type:`), result.contentType);
      console.log(chalk.white(`Security:`), JSON.stringify(result.security, null, 2));
      console.log(chalk.gray(`Schema:`), JSON.stringify(result.structure, null, 2));

      if (options.save) {
        const fs = await import("fs/promises");
        await fs.writeFile(options.save, JSON.stringify(result, null, 2));
        console.log(chalk.green(`\nSaved report to ${options.save}`));
      }
    } catch (err: any) {
      spinner.fail(chalk.red(`Error: ${err.message}`));
    }
  });

program.parse(process.argv);