export interface ValidatorGetResponse {
  data?: {
    pubkey: string;
    ethaddress: string;
  };
  message?: { message: string };
}
