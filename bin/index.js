#! /usr/bin/env node

import initializeProject from "./template.js";
import showHelp from "./utils.js";
import boxen from "boxen";
import chalk from "chalk";

console.log(
  boxen(chalk.green("IDD ALONEDEV CLI"), {
    padding: 1,
    margin: 1,
    borderColor: "green",
    borderStyle: "double",
    dimBorder: true,
  })
);

const version = "1.0.0";

const commandParam = process.argv[2];
if (commandParam == "--help" || commandParam == "-h") {
  showHelp();
} else if (commandParam == "--version" || commandParam == "-v") {
  console.log(version);
} else if (!commandParam) {
  console.log(chalk.yellow("need help? try --help"));
} else {
  initializeProject(commandParam);
}
