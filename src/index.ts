import { getFileToChainInfo, validateChainInfo } from "./validate";

const main = async () => {
  // get file name
  const args = process.argv.slice(2);

  // get json from file
  const rawChainInfo = getFileToChainInfo(args[0]);

  // validate chain info
  const errorMessage = await validateChainInfo(rawChainInfo);

  if (errorMessage) {
    throw new Error(errorMessage);
  }
};

main();
