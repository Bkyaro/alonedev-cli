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

const version = "1.0.3";

const commandParam = process.argv.slice(2);
if (commandParam[0] == "--help" || commandParam[0] == "-h") {
  showHelp();
} else if (commandParam[0] == "--version" || commandParam[0] == "-v") {
  console.log(version);
} else if (!commandParam?.length) {
  console.log(chalk.yellow("need help? try --help"));
} else {
  const installMethod = commandParam.includes("--npm")
    ? "npm"
    : commandParam.includes("--yarn")
    ? "yarn"
    : null;
  const paramIndex = commandParam.indexOf(`--${installMethod}`);

  if (paramIndex !== -1) {
    commandParam.splice(paramIndex, 1);
  }

  let possibleProjectName = commandParam[0];

  initializeProject(possibleProjectName, installMethod);
}
