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

  allValidatorsInfo.forEach((validatorInfo) => {
    if (validatorInfo.data != null) {
      //Could be null if the validator is not in the beaconcha database
      summaryValidatorURL += validatorInfo.data.validatorindex + ",";
    }
  });

  summaryValidatorURL = summaryValidatorURL.slice(0, -1);

  return summaryValidatorURL;
}
