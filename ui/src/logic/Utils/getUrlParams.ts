import { network, web3signerApiURL } from "../../params";

export function getUrlParams(): {
  signerUrl: string;
  authToken: string;
  network: string;
  host: string;
} {
  const search = new URLSearchParams(window.location.search);
  return {
    network: search.get("network") || network,
    signerUrl: search.get("signerUrl") || web3signerApiURL,
    authToken: search.get("authToken") || "",
    host: search.get("host") || "",
  };
}
