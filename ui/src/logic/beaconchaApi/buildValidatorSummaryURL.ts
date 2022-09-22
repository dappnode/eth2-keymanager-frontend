import { BeaconchaGetResponse } from "./types";
import { beaconchaApiParamsMap } from "../../params";

export default function buildValidatorSummaryURL({
  allValidatorsInfo,
  network,
}: {
  allValidatorsInfo: BeaconchaGetResponse[];
  network: string;
}): string {
  let summaryValidatorURL =
    beaconchaApiParamsMap.get(network)!.baseUrl + "/dashboard?validators="; //TODO Be careful with the !

  allValidatorsInfo.forEach((validatorInfo) => {
    summaryValidatorURL += validatorInfo.data.validatorindex + ",";
  });

  summaryValidatorURL = summaryValidatorURL.slice(0, -1);

  console.log(summaryValidatorURL); //TODO Remove

  return summaryValidatorURL;
}
