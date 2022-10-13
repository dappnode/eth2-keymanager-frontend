export interface ValidatorGetResponse {
  data?: {
    pubkey: string;
    ethaddress: string;
  };
  message?: { message: string };
}

export interface ValidatorPostRequest {
  ethaddress: string;
}

export interface ValidatorPostResponse {
  message?: { message: string };
}
