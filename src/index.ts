import { checkImage, getFileToChainInfo, validateChainInfo } from "./validate";
import { checkRestConnectivity } from "@keplr-wallet/chain-validator";
import { checkRPCConnectivity } from "./connection";

const main = async () => {
  // get file name
  const args = process.argv.slice(2);

  try {
    // get json from file
    const rawChainInfo = getFileToChainInfo(args[0]);

    // check chain image file
    await checkImage(args[0].split('/')[1].split('.')[0]);

    // check RPC alive
    await checkRPCConnectivity(rawChainInfo.chainId, rawChainInfo.rpc);

    // check REST alive
    await checkRestConnectivity(rawChainInfo.chainId, rawChainInfo.rest);

    // validate chain info
    const errorMessage = await validateChainInfo(rawChainInfo);

    if (errorMessage) {
      throw new Error(errorMessage);
    }
  } catch (error) {
    if(error instanceof Error) {
      throw new Error(error.message);
    }
  }

};

main();
