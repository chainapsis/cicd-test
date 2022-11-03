import sizeOf from 'image-size';
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

export const checkImage = (fileName: string) => {
  try {
    const path = "images/" + fileName + ".png";
    const dimensions = sizeOf(path);
    if (dimensions.width !== 256 || dimensions.height !== 256) {
      throw new Error(
        "Image size is not 256x256px. size : " + JSON.stringify(dimensions)
      );
    }
  } catch (error) {
    if(error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

