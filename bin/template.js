import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import simpleGit from "simple-git";
import readline from "readline";
export default function initializeProject(projectName) {
  const tempDir = path.join(process.cwd(), "temp");
  const projectDir = path.join(process.cwd(), projectName);
  const repoUrl = "http://git.maiyuan.online/sunzi/alone-dev/template.git";

  //检查当前目录
  const isCurrentDirectoryEmpty = isDirectoryEmpty(process.cwd());

  if (!isCurrentDirectoryEmpty) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      "🌜当前目录不为空,文件可能会被覆盖,是否继续(y/n)🌛: ",
      (answer) => {
        rl.close();
        if (answer.toLowerCase() !== "y") {
          console.log(chalk.yellow("💔操作已中断💔"));
          return;
        }

        startInitialization();
      }
    );
  } else {
    startInitialization();
  }

  function startInitialization() {
    console.log(chalk.yellow("正在拉取远程仓库..."));
    simpleGit().clone(repoUrl, tempDir, (err, _) => {
      if (err) {
        console.error(
          chalk.red(
            "拉取远程仓库失败，请排查模板代码库权限或网络连接 🟥~⬜️~⬜️~⬜️~⬜️",
            err
          )
        );
        return;
      }

      console.log(chalk.green("远程仓库拉取成功🟩~⬜️~⬜️~⬜️~⬜️"));
      console.log(chalk.yellow("正在复制文件..."));

      try {
        if (!fs.existsSync(projectDir)) {
          fs.mkdirSync(projectDir);
        }
        copyFiles(tempDir, projectDir, projectName);
      } catch (err) {
        chalk.red(
          "拉取远程仓库失败，请排查模板代码库权限或网络连接🟩~🟥~⬜️~⬜️~⬜️",
          err
        );
      }

      console.log(chalk.green("文件复制完成🟩~🟩~⬜️~⬜️~⬜️"));

      // console.log(chalk.yellow("正在初始化项目..."));
      // execSync("npm init", { stdio: "inherit", cwd: projectDir });
      // console.log(chalk.green("项目初始化完成！"));

      console.log(chalk.yellow("正在清理临时文件..."));
      try {
        deleteFolderRecursive(tempDir);
      } catch (err) {
        chalk.red("临时文件清理失败🟩~🟩~🟥~⬜️~⬜️", err);
      }
      console.log(chalk.green("临时文件清理完成🟩~🟩~🟩~⬜️~⬜️"));

      console.log(chalk.yellow("正在初始化git..."));
      try {
        execSync("git init", { stdio: "inherit", cwd: projectDir });
      } catch (err) {
        chalk.red("初始化git失败，请尝试手动运行git init🟩~🟩~🟩~🟥~⬜️", err);
      }
      console.log(chalk.green("初始化git完成🟩~🟩~🟩~🟩~⬜️"));

      console.log(chalk.yellow("正在安装依赖..."));
      try {
        execSync("npm install", { stdio: "inherit", cwd: projectDir });
      } catch (err) {
        chalk.red("执行依赖安装失败，请尝试手动安装🟩~🟩~🟩~🟩~🟥", err);
      }
      console.log(chalk.green("依赖安装完成🟩~🟩~🟩~🟩~🟩"));
      console.log(chalk.green("🎉执行完毕🎉"));
    });
  }
}

//拷贝远程仓库模板文件，去除.git文件夹记录
function copyFiles(sourceDir, targetDir, projectName) {
  const files = fs.readdirSync(sourceDir);

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    const stats = fs.statSync(sourcePath);

    if (stats.isFile()) {
      let content = fs.readFileSync(sourcePath, "utf-8");
      if (path.extname(file) !== ".md") {
        content = content.replace(/sunzi-template/g, projectName);
      }
      fs.writeFileSync(targetPath, content);
    } else if (stats.isDirectory()) {
      if (file === ".git") {
        continue;
      }
      fs.mkdirSync(targetPath);
      copyFiles(sourcePath, targetPath, projectName);
    }
  }
}

//删除用于复制的远程仓库
function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file) {
      const curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

//检查目录是否为空
function isDirectoryEmpty(directoryPath) {
  const files = fs.readdirSync(directoryPath);
  return files.length === 0;
}
