import { ApiParams } from "./types";

export const burnAddress = "0x0000000000000000000000000000000000000000";

export const beaconchaApiParamsMap = new Map<string, ApiParams>([
  ["mainnet", { baseUrl: "https://beaconcha.in", apiPath: "/api/v1/" }],
  ["prater", { baseUrl: "https://prater.beaconcha.in", apiPath: "/api/v1/" }],
  ["gnosis", { baseUrl: "https://beacon.gnosischain.in", apiPath: "/api/v1/" }],
]);

export const availableNetworks = ["mainnet", "prater", "gnosis"]; //TODO chiado?

export const validatorApiProxyUrl = "http://localhost:3001";

export const validatorProxyApiParams = {
  baseUrl: "http://localhost:3001", //TODO: Have URL for validator proxy?
  apiPath: "/",
  //authToken:, TODO: add auth token to proxy?
};
