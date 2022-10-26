import { Web3SignerStatus } from "../../types";

export interface Web3signerGetResponse {
  data: {
    validating_pubkey: string;
    derivation_path: string;
    readonly: boolean;
  }[];
  error?: { message: string };
}

export interface Web3signerPostRequest {
  keystores: File[];
  passwords: string[];
  slashingProtection: File | undefined;
}

export interface Web3signerPostResponse {
  data: {
    status: string;
    message: string;
  }[];
  error?: { message: string };
}

export interface Web3signerDeleteRequest {
  pubkeys: string[];
}

export interface Web3signerDeleteResponse {
  data: {
    status: string;
    message: string;
  }[];
  slashing_protection?: string;
  error?: { message: string };
}

export interface Web3signerHealthcheckResponse {
  status: Web3SignerStatus;
  checks: {
    id: string;
    status: string;
  }[];
  outcome: string;
}
