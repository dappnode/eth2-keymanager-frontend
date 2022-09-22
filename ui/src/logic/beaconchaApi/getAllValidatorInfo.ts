import { BeaconchaApi } from ".";
import { BeaconchaGetResponse } from "./types";

export default async function getAllValidatorInfo({
  beaconchaApi,
  allValidatorPKs,
}: {
  beaconchaApi: BeaconchaApi;
  allValidatorPKs: string[];
}): Promise<BeaconchaGetResponse[]> {
  const validatorsInfo = new Array<BeaconchaGetResponse>();

  allValidatorPKs.forEach(async (pubkey) => {
    let validatorInfo = await beaconchaApi.getValidatorInfo(pubkey);
    validatorsInfo.push(validatorInfo);
  });

  return validatorsInfo;
}
