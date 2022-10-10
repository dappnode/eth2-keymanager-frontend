import { ApiParams } from "./types";

export const beaconchaApiParamsMap = new Map<string, ApiParams>([
  ["mainnet", { baseUrl: "https://beaconcha.in", apiPath: "/api/v1/" }],
  ["prater", { baseUrl: "https://prater.beaconcha.in", apiPath: "/api/v1/" }],
  ["gnosis", { baseUrl: "https://beacon.gnosischain.in", apiPath: "/api/v1/" }],
]);

export const keyManagerUiUrl = "http://localhost:3000"; //TODO: Change to env variable?

export const availableNetworks = ["mainnet", "prater", "gnosis"];

export const validatorClientsParamsPrater = new Map<string, ApiParams>([
  [
    "lighthouse",
    {
      consensusClient: "lighthouse-prater",
      baseUrl: "http://validator.lighthouse-prater.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken:
        "api-token-0x0200e6ce18e26fd38caca7ae1bfb9e2bba7efb20ed2746ad17f2f6dda44603152d",
    },
  ],
  [
    "prysm",
    {
      consensusClient: "prysm-prater",
      baseUrl: "http://validator.prysm-prater.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.MxwOozSH-TLbW_XKepjyYDHm2IT8Ki0tD3AHuajfNMg",
    },
  ],
  [
    "teku",
    {
      consensusClient: "teku-prater",
      baseUrl: "https://validator.teku-prater.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken: "cd4892ca35d2f5d3e2301a65fc7aa660",
      certFilePath: "/security/teku_client_keystore.p12",
    },
  ],
  [
    "nimbus",
    {
      consensusClient: "nimbus-prater",
      baseUrl: "http://beacon-validator.nimbus-prater.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.MxwOozSH-TLbW_XKepjyYDHm2IT8Ki0tD3AHuajfNMg",
    },
  ],
]);

export const validatorClientsParamsMainnet = new Map<string, ApiParams>([
  [
    "lighthouse",
    {
      consensusClient: "lighthouse",
      baseUrl: "http://validator.lighthouse.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken:
        "api-token-0x0200e6ce18e26fd38caca7ae1bfb9e2bba7efb20ed2746ad17f2f6dda44603152d",
    },
  ],
  [
    "prysm",
    {
      consensusClient: "prysm",
      baseUrl: "http://validator.prysm.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.MxwOozSH-TLbW_XKepjyYDHm2IT8Ki0tD3AHuajfNMg",
    },
  ],
  [
    "teku",
    {
      consensusClient: "teku",
      baseUrl: "https://validator.teku.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken: "cd4892ca35d2f5d3e2301a65fc7aa660",
      certFilePath: "/security/teku_client_keystore.p12",
    },
  ],
  [
    "nimbus",
    {
      consensusClient: "nimbus",
      baseUrl: "http://beacon-validator.nimbus.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.MxwOozSH-TLbW_XKepjyYDHm2IT8Ki0tD3AHuajfNMg",
    },
  ],
]);

export const validatorClientsParamsGnosis = new Map<string, ApiParams>([
  [
    "lighthouse",
    {
      consensusClient: "lighthouse-gnosis",
      baseUrl: "http://validator.lighthouse-gnosis.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken:
        "api-token-0x0200e6ce18e26fd38caca7ae1bfb9e2bba7efb20ed2746ad17f2f6dda44603152d",
    },
  ],
  [
    "prysm",
    {
      consensusClient: "prysm-gnosis",
      baseUrl: "http://validator.gnosis-beacon-chain-prysm.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.MxwOozSH-TLbW_XKepjyYDHm2IT8Ki0tD3AHuajfNMg",
    },
  ],
  [
    "teku",
    {
      consensusClient: "teku-gnosis",
      baseUrl: "https://validator.teku-gnosis.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken: "cd4892ca35d2f5d3e2301a65fc7aa660",
      certFilePath: "/security/teku_client_keystore.p12",
    },
  ],
  [
    "nimbus",
    {
      consensusClient: "nimbus-gnosis",
      baseUrl: "http://beacon-validator.nimbus.dappnode:3500",
      apiPath: "/eth/v1/",
      authToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.MxwOozSH-TLbW_XKepjyYDHm2IT8Ki0tD3AHuajfNMg",
    },
  ],
]);

export const validatorClientApiNetworkMap = new Map<
  string,
  Map<string, ApiParams>
>([
  ["mainnet", validatorClientsParamsMainnet],
  ["prater", validatorClientsParamsPrater],
  ["gnosis", validatorClientsParamsGnosis],
]);
