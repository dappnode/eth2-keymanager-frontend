import { AllowedRequestTypes } from "./types";
import { Request, Response } from "express";
import { validatorClientApiNetworkMap } from "./params";
import { isEthAddress, isValidatorPK } from "./utils/utils";

export default class RequestChecker {
  req: Request;
  res: Response;

  constructor(request: Request, response: Response) {
    this.req = request;
    this.res = response;
  }

  public isFeeRecipientReqOk(reqType: AllowedRequestTypes): boolean {
    const client = this.req.query.client as string;
    const validatorPublicKey = this.req.query.validatorPublicKey as string;
    const network = this.req.query.network as string;
    const newFeeRecipient = this.req.body?.ethaddress as string;

    switch (reqType) {
      case AllowedRequestTypes.POST:
        if (newFeeRecipient === undefined) {
          this.res.statusMessage = "Bad request. Missing new fee recipient.";
        } else if (!isEthAddress(newFeeRecipient)) {
          this.res.statusMessage =
            "Bad request. Invalid new fee recipient address.";
        }
      // eslint-disable-next-line no-fallthrough
      case AllowedRequestTypes.GET:
        if (
          client === undefined ||
          validatorPublicKey === undefined ||
          network === undefined
        ) {
          this.res.statusMessage =
            "Bad request. Missing: network, consensus client or validator public key.";
        } else if (!validatorClientApiNetworkMap.has(network)) {
          this.res.statusMessage = "Bad request. Invalid network.";
        } else if (!validatorClientApiNetworkMap.get(network)?.has(client)) {
          this.res.statusMessage = "Bad request. Invalid consensus client.";
        } else if (!isValidatorPK(validatorPublicKey)) {
          this.res.statusMessage = "Bad request. Invalid validator public key.";
        }
        break;
      default:
        return false;
    }

    if (this.res.statusMessage !== undefined) {
      return false;
    } else {
      return true;
    }
  }
}
