import { BeaconchaGetResponse } from "./types";
import { ApiParams } from "../../types";

export class BeaconchaApi {
  //authToken: string | undefined;
  //host: string | undefined;
  baseUrl: string;
  endpoint: string;
  fullUrl: string;

  constructor(apiParams: ApiParams) {
    this.endpoint = apiParams.apiPath;
    this.baseUrl = apiParams.baseUrl;
    this.fullUrl = this.baseUrl + this.endpoint;
    //this.authToken = authToken;
    //this.host = host;
  }

  /**
   * Get validator indexes for a list of public keys
   * https://beaconcha.in/api/v1/docs/index.html#/Validator/get_api_v1_validator__indexOrPubkey_
   */
  public async getValidatorInfo(pubkey: string): Promise<BeaconchaGetResponse> {
    try {
      return (await this.request(
        "GET",
        this.fullUrl + "validator/" + pubkey
      )) as BeaconchaGetResponse;
    } catch (e) {
      return {
        status: "error",
        data: {},
        error: {
          message: e.message,
        },
      };
    }
  }

  public async getValidatorIndex(pubkey: string): Promise<number> {
    const response = await this.getValidatorInfo(pubkey);
    const validatorIndex = response.data.validatorindex;

    return validatorIndex ?? -1; //TODO: handle error
  }

  private async request(method: string, url: string, body?: any): Promise<any> {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    /*if (this.authToken) {
      headers = {
        ...headers,
        ...{ Authorization: `Bearer ${this.authToken}` },
      };
    }
    if (this.host) {
      headers = { ...headers, ...{ Host: this.host } };
    }*/

    const response = await fetch(url, {
      method,
      headers,
      body: body ? body : undefined,
    });
    if (response.ok) return await response.json();
    throw new Error(response.statusText);
  }
}
