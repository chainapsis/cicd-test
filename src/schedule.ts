import { readdirSync } from "fs";
import { getFileToChainInfo, validateChainInfo } from "./validate";
import * as core from "@actions/core";

const main = async () => {
  const jsonFiles = readdirSync("cosmos");

  const errorMessages = await Promise.all(
    jsonFiles.map((file) => {
      const rawChainInfo = getFileToChainInfo(`cosmos/${file}`);
      const errorMessage = validateChainInfo(rawChainInfo);

      return errorMessage;
    })
  );

  core.setFailed(errorMessages.join("\n"));
};

main();
