import { ApiParams } from "./types";

export const beaconchaApiParamsMap = new Map<string, ApiParams>([
  ["mainnet", { baseUrl: "https://beaconcha.in", apiPath: "/api/v1/" }],
  ["prater", { baseUrl: "https://prater.beaconcha.in", apiPath: "/api/v1/" }],
  [
    "gnosis",
    { baseUrl: "https://beacon.gnosischain.com", apiPath: "/api/v1/" },
  ],
]);

export const maxValidatorsPerRequest = 100; //For beaconcha.in --> TODO: is it the same for Gnosis?

export interface AppParams {
  network: string;
  signerUrl: string;
  signerAuthToken?: string;
  consensusClient?: string;
  executionClient?: string;
}
