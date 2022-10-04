import { ValidatorGetResponse, ValidatorPostResponse } from "./types";
import { StandardApi } from "../standardApi";

export class ValidatorApi extends StandardApi {
  /**
   * Request the proxy to list the validator public key to eth address mapping for fee recipient feature on a specific public key.
   * https://ethereum.github.io/keymanager-APIs/#/Fee%20Recipient/listFeeRecipient
   */
  public async getFeeRecipient(
    publicKey: string
  ): Promise<ValidatorGetResponse> {
    try {
      return (await this.request(
        /*"GET",
        this.baseUrl + "/eth/v1/validator/" + publicKey + "/feerecipient"*/
        "GET",
        this.proxyUrl
          ? this.proxyUrl +
              "/feerecipient/?client=" +
              this.consensusClient +
              "&validatorPublicKey=" +
              publicKey
          : this.baseUrl + "/eth/v1/validator/" + publicKey + "/feerecipient"
      )) as ValidatorGetResponse;
    } catch (e) {
      return {
        message: { message: e.message },
      };
    }
  }

  /**
   * Request the proxy to set the validator client fee recipient mapping which will then update the beacon node..
   * https://ethereum.github.io/keymanager-APIs/#/Fee%20Recipient/setFeeRecipient
   */
  public async setFeeRecipient(
    newFeeRecipient: string,
    publicKey: string
  ): Promise<ValidatorPostResponse> {
    try {
      return (await this.request(
        /*"POST",
        this.baseUrl + "/eth/v1/validator/" + publicKey + "/feerecipient",
        JSON.stringify({ ethaddress: newFeeRecipient })*/
        "POST",
        this.proxyUrl
          ? this.proxyUrl +
              "/feerecipient/?client=" +
              this.consensusClient +
              "&validatorPublicKey=" +
              publicKey
          : this.baseUrl + "/eth/v1/validator/" + publicKey + "/feerecipient",
        JSON.stringify({ ethaddress: newFeeRecipient })
      )) as ValidatorPostResponse;
    } catch (e) {
      return {
        message: {
          message: e.message,
        },
      };
    }
  }
}
