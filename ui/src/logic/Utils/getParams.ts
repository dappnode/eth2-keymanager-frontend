import { AppParams, beaconchaApiParamsMap } from "../../params";

export function getParams(): AppParams {
  const search = new URLSearchParams(window.location.search);

  let currentNetwork = search.get("network") || window.env.NETWORK || "mainnet";

  if (!beaconchaApiParamsMap.has(currentNetwork)) currentNetwork = "";

  return {
    network: currentNetwork,
    signerUrl: search.get("signerUrl") || window.env?.WEB3SIGNER_API_URL || "",
    signerAuthToken:
      search.get("authToken") || window.env?.WEB3SIGNER_AUTH_TOKEN || "",
    consensusClient:
      search.get("consensusClient") || window.env?.CONSENSUS_CLIENT || "",
    executionClient:
      search.get("executionClient") || window.env?.EXECUTION_CLIENT || "",
  };
}
