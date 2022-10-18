import { ApiParams } from "./types";

const isProduction = process.env.NODE_ENV === "production";

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

export const network = isProduction
  ? process.env.REACT_APP_NETWORK || ""
  : "prater";

export const consensusClient = isProduction
  ? process.env["_DAPPNODE_GLOBAL_CONSENSUS_CLIENT_" + network.toUpperCase()] ||
    ""
  : "prysm";

export const executionClient = isProduction
  ? process.env["_DAPPNODE_GLOBAL_EXECUTION_CLIENT_" + network.toUpperCase()] ||
    ""
  : "geth";

export const web3signerApiURL = isProduction
  ? process.env.REACT_APP_WEB3SIGNER_API_URL || ""
  : "http://web3signer.web3signer-prater.dappnode:9000";
