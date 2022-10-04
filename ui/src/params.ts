import { ApiParams } from "./types";

export const beaconchaApiParamsMap = new Map<string, ApiParams>([
  ["mainnet", { baseUrl: "https://beaconcha.in", apiPath: "/api/v1/" }],
  ["prater", { baseUrl: "https://prater.beaconcha.in", apiPath: "/api/v1/" }],
  ["gnosis", { baseUrl: "https://beacon.gnosischain.in", apiPath: "/api/v1/" }],
]);

export const availableNetworks = ["mainnet", "prater", "gnosis"];

export const validatorClientApiMap = new Map<string, ApiParams>([
  [
    "lighthouse-prater",
    {
      baseUrl: "http://validator.lighthouse-prater.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken:
        "api-token-0x0200e6ce18e26fd38caca7ae1bfb9e2bba7efb20ed2746ad17f2f6dda44603152d",
    },
  ],
  [
    "prysm-prater",
    {
      baseUrl: "http://validator.prysm-prater.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.MxwOozSH-TLbW_XKepjyYDHm2IT8Ki0tD3AHuajfNMg",
    },
  ],
  [
    "teku-prater",
    {
      baseUrl: "https://validator.teku-prater.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken: "cd4892ca35d2f5d3e2301a65fc7aa660",
      certFilePath: "/security/teku_client_keystore.p12",
    },
  ],
  [
    "nimbus-prater",
    {
      baseUrl: "http://beacon-validator.nimbus-prater.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.MxwOozSH-TLbW_XKepjyYDHm2IT8Ki0tD3AHuajfNMg",
    },
  ],
]);
