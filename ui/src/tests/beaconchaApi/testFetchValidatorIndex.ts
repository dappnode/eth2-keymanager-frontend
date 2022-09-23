import { BeaconchaApi } from "../../apis/beaconchaApi";
import { expect } from "chai";
import { beaconchaApiParamsMap } from "../../params";
import { Web3signerGetResponse } from "../../apis/web3signerApi/types";
import { networkTestMap } from "./networkTestMap";

describe("Test for fetching validator indexes in every available network", () => {
  it("should return data corresponding to every validator PK", () => {
    const networks = ["mainnet", "prater", "gnosis"];

    for (const network of networks) {
      const keystoresGet = {
        status: "ok",
        data: [
          {
            validating_pubkey: networkTestMap.get(network)!.pubkeys[0],
            derivation_path: "",
            readonly: false,
          },
          {
            validating_pubkey: networkTestMap.get(network)!.pubkeys[1],
            derivation_path: "",
            readonly: false,
          },
        ],
      } as Web3signerGetResponse;

      const beaconchaApi = new BeaconchaApi(
        beaconchaApiParamsMap.get(network)!
      );

      beaconchaApi
        .fetchAllValidatorsInfo({
          beaconchaApi,
          keystoresGet,
        })
        .then((allValidatorsInfo) => {
          expect(allValidatorsInfo[0].data.validatorindex).to.equal(
            networkTestMap.get(network)!.indexes[0]
          );
          expect(allValidatorsInfo[1].data.validatorindex).to.equal(
            networkTestMap.get(network)!.indexes[1]
          );
        });
    }
  });
});
