export interface BeaconchaGetResponse {
  status: string;
  data: {
    activationeligibilityepoch?: number;
    activationepoch?: number;
    balance?: number;
    effectivebalance?: number;
    exitepoch?: number;
    lastattestationslot?: number;
    name?: string;
    pubkey?: string;
    slashed?: boolean;
    status?: string;
    validatorindex?: number;
    withdrawableepoch?: number;
    withdrawalcredentials?: string;
  }[];
  error?: { message: string };
}
