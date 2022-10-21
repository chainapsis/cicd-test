import { readFileSync } from "fs";
import { ChainInfo } from "@keplr-wallet/types";
import { ChainUpdaterService } from "@keplr-wallet/background";
import { validateBasicChainInfoType } from "@keplr-wallet/chain-validator";

export const getFileToChainInfo = (filePath: string) => {
  const file = readFileSync(filePath, "utf-8");
  const chainInfo: ChainInfo = JSON.parse(file);
  return chainInfo;
};

export const validateChainInfo = async (chainInfo: ChainInfo) => {
  try {
    // validate chain information
    const validChainInfo = await validateBasicChainInfoType(chainInfo);

    // validate chain update
    const updateInfo = await ChainUpdaterService.checkChainUpdate(
      validChainInfo
    );

    // Check chain id
    if (validChainInfo.chainId !== updateInfo.chainId) {
      return `Invalid chain id ${validChainInfo.chainId}`;
    }

    // Check chain features
    if (updateInfo.features?.length !== 0) {
      return `${
        validChainInfo.chainName
      } will have to updated features ${updateInfo.features?.join(", ")}`;
    }
  } catch {
    return `Invalid Chain Information`;
  }
};
