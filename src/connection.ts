import Axios, { AxiosResponse } from "axios";
import { ChainIdHelper } from "@keplr-wallet/cosmos";

export async function checkRPCConnectivity(
  chainId: string,
  rpc: string,
): Promise<void> {
  const rpcInstance = Axios.create({
    baseURL: rpc,
  });

  let resultStatus: AxiosResponse<{
    result: {
      node_info: {
        network: string;
      };
    };
  }>;

  try {
    // Get the status to get the chain id.
    resultStatus = await rpcInstance.get<{
      result: {
        node_info: {
          network: string;
        };
      };
    }>("/status");
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get response /status from rpc endpoint");
  }

  const version = ChainIdHelper.parse(chainId);

  const versionFromRPCStatus = ChainIdHelper.parse(
    resultStatus.data.result.node_info.network
  );

  if (versionFromRPCStatus.identifier !== version.identifier) {
    throw new Error(
      `RPC endpoint has different chain id (expected: ${chainId}, actual: ${resultStatus.data.result.node_info.network})`
    );
  } else if (versionFromRPCStatus.version !== version.version) {
    // In the form of {chain_identifier}-{chain_version}, if the identifier is the same but the version is different, it is strictly an error,
    // but it is actually the same chain but the chain version of the node is different.
    // In this case, it is possible to treat as a warning and proceed as it is, so this is separated with above error.
    throw new Error(
      `RPC endpoint has different chain id (expected: ${chainId}, actual: ${resultStatus.data.result.node_info.network})`
    );
  }
}