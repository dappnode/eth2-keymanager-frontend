import { beaconchaApiParamsMap, network, web3signerApiURL } from "../../params";

export function getUrlParams(): {
  signerUrl: string;
  authToken: string;
  network: string;
  host: string;
} {
  const search = new URLSearchParams(window.location.search);

  let currentNetwork = search.get("network") || network;

  if (!beaconchaApiParamsMap.has(currentNetwork)) currentNetwork = "";

  return {
    network: currentNetwork,
    signerUrl: search.get("signerUrl") || web3signerApiURL,
    authToken: search.get("authToken") || "",
    host: search.get("host") || "",
  };
}
