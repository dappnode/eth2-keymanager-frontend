import { BeaconchaApi } from ".";

export default async function getAllValidatorIndexes({
  beaconchaApi,
  allValidatorPKs,
}: {
  beaconchaApi: BeaconchaApi;
  allValidatorPKs: string[];
}): Promise<number[]> {
  const validatorIndexes = new Array<number>();

  allValidatorPKs.forEach(async (pubkey) => {
    let index = await beaconchaApi.getValidatorIndex(pubkey);
    validatorIndexes.push(index);
  });

  return validatorIndexes;
}
