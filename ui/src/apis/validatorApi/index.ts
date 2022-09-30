import { ValidatorGetResponse } from "./types";
import { StandardApi } from "../standardApi";

export class ValidatorApi extends StandardApi {
  /**
   * List the validator public key to eth address mapping for fee recipient feature on a specific public key.
   * https://ethereum.github.io/keymanager-APIs/#/Fee%20Recipient/listFeeRecipient
   */
  public async getFeeRecipient(
    publicKey: string
  ): Promise<ValidatorGetResponse> {
    try {
      return (await this.request(
        "GET",
        this.baseUrl + "/eth/v1/validator/" + publicKey + "/feerecipient"
      )) as ValidatorGetResponse;
    } catch (e) {
      return {
        message: { message: e.message },
      };
    }
  }
}
