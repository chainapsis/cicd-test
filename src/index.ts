// import { validateChainInfo } from "./validation";
import { readFileSync } from "fs";
import { ChainInfo } from "@keplr-wallet/types";
import { ChainUpdaterService } from "@keplr-wallet/background";
import { validateBasicChainInfoType } from "@keplr-wallet/chain-validator";

import core from "@actions/core";

const getFileToJson = (filePath: string) => {
  const file = readFileSync(filePath, "utf-8");
  const chainInfo: ChainInfo = JSON.parse(file);
  return chainInfo;
};

const main = async () => {
  // get file name
  const args = process.argv.slice(2);

  // get json from file
  const rawChainInfo = getFileToJson(args[0]);

  try {
    // validate chain information
    const validChainInfo = await validateBasicChainInfoType(rawChainInfo);

    // validate chain update
    const updateInfo = await ChainUpdaterService.checkChainUpdate(
      validChainInfo
    );

    // Check chain id
    if (validChainInfo.chainId !== updateInfo.chainId) {
      core.setOutput(
        "errorOutput",
        `Invalid chain id ${validChainInfo.chainId}`
      );
    }

    // Check chain features
    if (updateInfo.features?.length !== 0) {
      core.setOutput(
        "errorOutput",
        `${
          validChainInfo.chainName
        } will have to updated features ${updateInfo.features?.join(", ")}`
      );
    }
  } catch {
    core.setOutput("errorOutput", `Invalid Chain Information`);
  }
};

main();
