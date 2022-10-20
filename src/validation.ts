import { ChainIdHelper } from "@keplr-wallet/cosmos";

// Get Chain Identifier
export const getChainIndetifier = (chainId: string) => {
  try {
    return ChainIdHelper.parse(chainId);
  } catch (err) {
    throw new Error("Unsupported format of chainId : " + chainId);
  }
};
