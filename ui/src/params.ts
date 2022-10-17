import { ApiParams } from "./types";

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

export const network = process.env.NETWORK || "";

export const consensusClient =
  process.env["_DAPPNODE_GLOBAL_CONSENSUS_CLIENT_" + network.toUpperCase()] ||
  "Nimbus";

export const executionClient =
  process.env["_DAPPNODE_GLOBAL_EXECUTION_CLIENT_" + network.toUpperCase()] ||
  "Geth";

export const web3signerApiURL = process.env.WEB3SIGNER_API_URL || "";
