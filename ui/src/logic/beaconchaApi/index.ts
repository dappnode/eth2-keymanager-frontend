import { BeaconchaGetResponse } from "./types";
import { ApiParams } from "../../types";
import { Web3signerGetResponse } from "../web3signerApi/types";

//TODO Use inheritance for both APIs?
export class BeaconchaApi {
  baseUrl: string;
  endpoint: string;
  fullUrl: string;

  constructor(apiParams: ApiParams) {
    this.endpoint = apiParams.apiPath;
    this.baseUrl = apiParams.baseUrl;
    this.fullUrl = this.baseUrl + this.endpoint;
  }

  /*
   * Fetch info for every validator PK
   */
  public async fetchAllValidatorsInfo({
    beaconchaApi,
    keystoresGet,
  }: {
    beaconchaApi: BeaconchaApi;
    keystoresGet: Web3signerGetResponse;
  }): Promise<BeaconchaGetResponse[]> {
    const validatorsInfo = new Array<BeaconchaGetResponse>();
    let allValidatorPKs = keystoresGet.data.map(
      (keystoreData) => keystoreData.validating_pubkey
    );

    console.log("allValidatorPKs", allValidatorPKs); //TODO Remove

    allValidatorPKs.forEach(async (pubkey) => {
      let validatorInfo = await beaconchaApi.fetchValidatorInfo(pubkey);
      validatorsInfo.push(validatorInfo);
    });

    return validatorsInfo;
  }

  /**
   * Get validator info for a list of public keys from beaconcha API
   * https://beaconcha.in/api/v1/docs/index.html#/Validator/get_api_v1_validator__indexOrPubkey_
   */
  public async fetchValidatorInfo(
    pubkey: string
  ): Promise<BeaconchaGetResponse> {
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

  //TODO: Are fields host and authToken needed?
  private async request(method: string, url: string, body?: any): Promise<any> {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const response = await fetch(url, {
      method,
      headers,
      body: body ? body : undefined,
    });
    if (response.ok) return await response.json();
    throw new Error(response.statusText);
  }
}
