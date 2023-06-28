export default function showHelp() {
  console.log("\nUsage:\r");
  console.log("\t自动拉取模板项目并初始化为指定项目名");
  console.log("\nOptions:\r");
  console.log(
    "\t<项目名>\t" + "\t\t" + "初始化项目名." + "\t\t" + "\r"
  );
  console.log(
    "\t--npm, --yarn, --pnpm\t\t"  + "指定依赖安装方式" + "\t\t" + "\r"
  );
  console.log("\t--version, -v\t\t        " + "查询版本号." + "\t\t" + "\r");
  console.log("\t--help, -h\t\t        " + "查询指令." + "\t\t\t" + "\n");
}
