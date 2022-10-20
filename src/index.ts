import { getChainIndetifier } from "./validation";

const main = async () => {
  const args = process.argv.slice(2);
  console.log("args", args);

  const test = getChainIndetifier("cosmoshub-1");
  console.log(test);
};

main();
