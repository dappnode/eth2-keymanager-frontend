import { expect } from "chai";
import { ValidatorApi } from "../../apis/validatorApi";
import { validatorProxyApiParams } from "../../params";
require("isomorphic-fetch");

describe("Test for checking /feerecipient endpoint of every consensus client", () => {
  it("should post a fee recipient address and get that same address", async () => {
    const clients = ["nimbus", "lighthouse", "prysm", "teku"];

    for (const client of clients) {
      console.log("CLIENT: ", client);

      const validatorApi = new ValidatorApi(
        validatorProxyApiParams,
        "prater", //TODO Test other networks
        client
      );

      const testValidatorAddress =
        "0x85abea8fb2f90371875e8ff4dadac8b5308662c2d40533d8d74c13544a2f315183e404181f4cfa65ce7b3a435b709d2f";
      const testFeeRecipientAddress =
        "0x0000000000000000000000000000000000000002";

      //TODO: Change this to an address from the web3signerApi

      const feeRecipientGetOld = await validatorApi.getFeeRecipient(
        testValidatorAddress
      );

      await validatorApi.setFeeRecipient(
        testFeeRecipientAddress,
        testValidatorAddress
      );

      const feeRecipientGetNew = await validatorApi.getFeeRecipient(
        testValidatorAddress
      );

      expect(feeRecipientGetNew.data?.ethaddress).to.equal(
        testFeeRecipientAddress
      );

      await validatorApi.setFeeRecipient(
        feeRecipientGetOld.data?.ethaddress!,
        testValidatorAddress
      );

      const feeRecipientGet = await validatorApi.getFeeRecipient(
        testValidatorAddress
      );

      expect(feeRecipientGet.data?.ethaddress).to.equal(
        feeRecipientGetOld.data?.ethaddress
      );
    }
  });
});
