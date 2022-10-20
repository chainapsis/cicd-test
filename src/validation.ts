import { ChainIdHelper } from "@keplr-wallet/cosmos";
import { ChainInfo } from "@keplr-wallet/types";

// Get Chain Identifier
const getChainIdentifier = (chainId: string) => {
  try {
    return ChainIdHelper.parse(chainId);
  } catch (err) {
    throw new Error("Unsupported format of chainId : " + chainId);
  }
};

export const validateChainInfo = async (chainInfo: ChainInfo) => {
  const chainIdentifier = getChainIdentifier(chainInfo.chainId);
  console.log("chainIdentifier", chainIdentifier);
};
