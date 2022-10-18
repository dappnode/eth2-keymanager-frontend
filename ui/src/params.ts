import { ApiParams } from "./types";
import { env } from "./env";

const isProduction = env.NODE_ENV === "production";

export const beaconchaApiParamsMap = new Map<string, ApiParams>([
  ["mainnet", { baseUrl: "https://beaconcha.in", apiPath: "/api/v1/" }],
  ["prater", { baseUrl: "https://prater.beaconcha.in", apiPath: "/api/v1/" }],
  [
    "gnosis",
    { baseUrl: "https://beacon.gnosischain.com", apiPath: "/api/v1/" },
  ],
]);

export const beaconchaBaseUrls = new Map<string, string>([
  ["mainnet", "https://beaconcha.in"],
  ["prater", "https://prater.beaconcha.in"],
  ["gnosis", "https://beacon.gnosischain.com"],
]);

export const availableNetworks = ["mainnet", "prater", "gnosis"];

export const maxValidatorsPerRequest = 100; //For beaconcha.in --> TODO: is it the same for Gnosis?

export const network = isProduction ? env.REACT_APP_NETWORK || "" : "prater";

export const consensusClient = isProduction
  ? env.REACT_APP_CONSENSUS_CLIENT || ""
  : "prysm";

export const executionClient = isProduction
  ? env.REACT_APP_EXECUTION_CLIENT || ""
  : "geth";

export const web3signerApiURL = isProduction
  ? env.REACT_APP_WEB3SIGNER_API_URL || ""
  : "http://web3signer.web3signer-prater.dappnode:9000";
