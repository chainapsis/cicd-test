import { getChainIndetifier } from "./validation";

const main = async () => {
  const test = getChainIndetifier("cosmoshub-1");
  console.log(test);
};

main();
