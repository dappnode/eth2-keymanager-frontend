import { BeaconchaGetResponse } from "./types";
import { Web3signerGetResponse } from "../web3signerApi/types";
import { StandardApi } from "../standardApi";

export class BeaconchaApi extends StandardApi {
  /*
   * Fetch info for every validator PK
   */
  public async fetchAllValidatorsInfo({
    keystoresGet,
  }: {
    keystoresGet: Web3signerGetResponse;
  }): Promise<BeaconchaGetResponse[]> {
    const validatorsInfo = new Array<BeaconchaGetResponse>();

    let allValidatorPKs = keystoresGet.data.map(
      (keystoreData) => keystoreData.validating_pubkey
    );

    const chunkSize = 100; //Max number of validators per request - TODO move to params? Is the same for Gnosis?

    for (let i = 0; i < allValidatorPKs.length; i += chunkSize) {
      const chunk = allValidatorPKs.slice(i, i + chunkSize);
      const chunkResponse = await this.fetchValidatorsInfo(chunk);
      validatorsInfo.push(chunkResponse);
    }

    return validatorsInfo;
  }

  /**
   * Get validator indexes for a list of public keys
   * https://beaconcha.in/api/v1/docs/index.html#/Validator/get_api_v1_validator__indexOrPubkey_
   */
  public async fetchValidatorsInfo(
    pubkeys: string[]
  ): Promise<BeaconchaGetResponse> {
    const fullUrl = `${this.baseUrl}${
      this.keymanagerEndpoint
    }validator/${pubkeys.join(",")}`;

    try {
      return (await this.request("GET", fullUrl)) as BeaconchaGetResponse;
    } catch (e) {
      return {
        status: "error",
        data: [],
        error: {
          message: e.message,
        },
      };
    }
  }
}
