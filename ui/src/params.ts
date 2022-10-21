import { ApiParams } from "./types";
import { env } from "./env";

export const beaconchaApiParamsMap = new Map<string, ApiParams>([
  ["mainnet", { baseUrl: "https://beaconcha.in", apiPath: "/api/v1/" }],
  ["prater", { baseUrl: "https://prater.beaconcha.in", apiPath: "/api/v1/" }],
  [
    "gnosis",
    { baseUrl: "https://beacon.gnosischain.com", apiPath: "/api/v1/" },
  ],
]);

export const maxValidatorsPerRequest = 100; //For beaconcha.in --> TODO: is it the same for Gnosis?

export const network = env.REACT_APP_NETWORK || "mainnet";

export const consensusClient = env.REACT_APP_CONSENSUS_CLIENT || "";

export const executionClient = env.REACT_APP_EXECUTION_CLIENT || "";

export const web3signerApiURL = env.REACT_APP_WEB3SIGNER_API_URL || "";
