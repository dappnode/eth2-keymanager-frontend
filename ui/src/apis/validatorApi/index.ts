import { ValidatorGetResponse } from "./types";

export class ValidatorApi {
  authToken: string;
  host: string | undefined;
  baseUrl: string;

  //AuthToken is needed to perform requests
  constructor(baseUrl: string, authToken: string, host?: string) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
    this.host = host;
  }

  /**
   * List the validator public key to eth address mapping for fee recipient feature on a specific public key.
   * https://ethereum.github.io/keymanager-APIs/#/Fee%20Recipient/listFeeRecipient
   */
  public async getFeeRecipient(
    publicKey: string
  ): Promise<ValidatorGetResponse> {
    try {
      return (await this.request(
        "GET",
        this.baseUrl + "/eth/v1/validator/" + publicKey + "/feerecipient"
      )) as ValidatorGetResponse;
    } catch (e) {
      return {
        message: { message: e.message },
      };
    }
  }

  private async request(method: string, url: string, body?: any): Promise<any> {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (this.authToken) {
      headers = {
        ...headers,
        ...{ Authorization: this.authToken },
      };
    }

    if (this.host) {
      headers = { ...headers, ...{ Host: this.host } };
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? body : undefined,
    });
    if (response.ok) return await response.json();
    throw new Error(response.statusText);
  }

  private async readText(files: File[]): Promise<string[]> {
    var data: string[] = [];
    for (var file of files) {
      const text = await file.text();
      data.push(text);
    }
    return data;
  }
}
