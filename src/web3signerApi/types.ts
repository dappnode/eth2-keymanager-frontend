export interface Web3signerGetResponse {
  data: {
    pubkey: string;
    url: string;
    readonly: boolean;
  }[];
  error?: { message: string };
}

export interface Web3signerPostRequest {
  remote_keys: {
    pubkey: string;
    url: string;
  }[];
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
  error?: { message: string };
}
