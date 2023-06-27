export default function showHelp() {
  console.log("\nUsage:\r");
  console.log("\t自动拉取模板项目并初始化为指定项目名");
  console.log("\nOptions:\r");
  console.log(
    "\t<项目名>\t" + "      " + "初始化项目名." + "\t\t" + "[string]\r"
  );
  console.log("\t--version, -v\t      " + "查询版本号." + "\t\t" + "[boolean]\r");
  console.log("\t--help, -h\t      " + "查询指令." + "\t\t\t" + "[boolean]\n");
}
