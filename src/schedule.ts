import { readdirSync } from "fs";
import { getFileToChainInfo, validateChainInfo } from "./validate";
import * as core from "@actions/core";

const main = async () => {
  const jsonFiles = readdirSync("cosmos");
  core.setOutput("hasError", false);

  const errorMessages = await Promise.all(
    jsonFiles.map((file) => {
      const rawChainInfo = getFileToChainInfo(`cosmos/${file}`);
      const errorMessage = validateChainInfo(rawChainInfo);

      return errorMessage;
    })
  );

  if (errorMessages.filter((message) => message).length !== 0) {
    core.setOutput("hasError", true);
    core.setOutput("errorMessage", errorMessages.join("\n"));
  }
};

main();
