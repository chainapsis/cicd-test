import { readdirSync } from "fs";
import { getFileToChainInfo, validateChainInfo } from "./validate";

const main = async () => {
  const jsonFiles = readdirSync("cosmos");

  const errorMessages = await Promise.all(
    jsonFiles.map((file) => {
      const rawChainInfo = getFileToChainInfo(`cosmos/${file}`);
      const errorMessage = validateChainInfo(rawChainInfo);

      return errorMessage;
    })
  );

  return errorMessages.join("\n");
};

main();
