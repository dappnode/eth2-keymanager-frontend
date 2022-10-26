import { env } from "../../env";
import { AppParams, beaconchaApiParamsMap } from "../../params";

export function getParams(): AppParams {
  const search = new URLSearchParams(window.location.search);

  let currentNetwork =
    search.get("network") || env.REACT_APP_NETWORK || "mainnet";

  if (!beaconchaApiParamsMap.has(currentNetwork)) currentNetwork = "";

  return {
    network: currentNetwork,
    signerUrl: search.get("signerUrl") || env.REACT_APP_WEB3SIGNER_API_URL, //Mandatory
    signerAuthToken:
      search.get("authToken") || env.REACT_APP_WEB3SIGNER_AUTH_TOKEN,
    consensusClient:
      search.get("consensusClient") || env.REACT_APP_CONSENSUS_CLIENT,
    executionClient:
      search.get("executionClient") || env.REACT_APP_EXECUTION_CLIENT,
  };
}
