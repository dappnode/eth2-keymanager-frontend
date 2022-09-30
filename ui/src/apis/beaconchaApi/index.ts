import { BeaconchaGetResponse } from "./types";
import { Web3signerGetResponse } from "../web3signerApi/types";
import { StandardApi } from "../standardApi";

export class BeaconchaApi extends StandardApi {
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

    for await (const validatorPK of allValidatorPKs) {
      const validatorInfo = await beaconchaApi.fetchValidatorInfo(validatorPK);
      validatorsInfo.push(validatorInfo);
    }

    return validatorsInfo;
  }

  /**
   * Get validator indexes for a list of public keys
   * https://beaconcha.in/api/v1/docs/index.html#/Validator/get_api_v1_validator__indexOrPubkey_
   */
  public async fetchValidatorInfo(
    pubkey: string
  ): Promise<BeaconchaGetResponse> {
    try {
      return (await this.request(
        "GET",
        this.baseUrl + this.endpoint + "validator/" + pubkey
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
}
