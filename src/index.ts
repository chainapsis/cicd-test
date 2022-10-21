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
  try {
    const updateInfo = await ChainUpdaterService.checkChainUpdate(chainInfo);

    // Check chain id
    if (chainInfo.chainId !== updateInfo.chainId) {
      throw new Error(`Invalid chain id ${chainInfo.chainId}`);
    }

    // Check chain features
    if (updateInfo.features?.length !== 0) {
      throw new Error(
        `${
          chainInfo.chainName
        } will have to updated features ${updateInfo.features?.join(", ")}`
      );
    }
  } catch {
    throw new Error(`Invalid ${chainInfo.chainName} information`);
  }
};

main();
