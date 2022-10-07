import { BeaconchaGetResponse } from "./types";
import { availableNetworks, beaconchaApiParamsMap } from "../../params";

export default function buildValidatorSummaryURL({
  allValidatorsInfo,
  network,
}: {
  allValidatorsInfo: BeaconchaGetResponse[];
  network: string;
}): string {
  if (network == null || !availableNetworks.includes(network)) {
    throw new Error(`Invalid network: ${network}`);
  }

  const baseUrl = beaconchaApiParamsMap.get(network)?.baseUrl;

  if (baseUrl == null) return "";

  let summaryValidatorURL = baseUrl + "/dashboard?validators=";

  allValidatorsInfo.forEach((validatorChunk) => {
    const chunkIndexes = validatorChunk.data.map(
      (validator) => validator.validatorindex
    );
    summaryValidatorURL += chunkIndexes.join(",");
  });

  return summaryValidatorURL;
}
