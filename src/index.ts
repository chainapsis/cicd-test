// import { validateChainInfo } from "./validation";
import { readFileSync } from "fs";
import { ChainInfo } from "@keplr-wallet/types";
import { ChainUpdaterService } from "@keplr-wallet/background";

const getFileToJson = (filePath: string) => {
  const file = readFileSync(filePath, "utf-8");
  const chainInfo: ChainInfo = JSON.parse(file);
  return chainInfo;
};

const main = async () => {
  // get file name
  const args = process.argv.slice(2);

  // get json from file
  const chainInfo = getFileToJson(args[0]);

  // validate chain information
  const test = await ChainUpdaterService.checkChainUpdate(chainInfo);
  console.log(test);
};

main();
