import { Web3signerDeleteResponse, Web3signerGetResponse, Web3signerPostResponse } from "./types";

export class Web3SignerApi {
  authToken: string | undefined;
  host: string | undefined;
  fullUrl: string;
  endpoint = "/eth/v1/keystores";

  constructor(baseUrl: string, authToken?: string, host?: string) {
    this.fullUrl = baseUrl + this.endpoint;
    this.authToken = authToken;
    this.host = host;
  }

  /**
   * Import remote keys for the validator client to request duties for.
   * https://ethereum.github.io/keymanager-APIs/#/Remote%20Key%20Manager/ImportRemoteKeys
   */
  public async importKeystores(
    keystores: File[],
    passwords: string[],
    slashingProtection: File | undefined
  ): Promise<Web3signerPostResponse> {
    try {
      var data;
      if (slashingProtection) {
        data = {
          keystores: await this.readText(keystores),
          passwords: passwords,
          slashing_protection: await slashingProtection?.text(),
        };
      } else {
        data = {
          keystores: await this.readText(keystores),
          passwords: passwords,
        };
      }
      return (await this.request("POST", this.fullUrl, data)) as Web3signerPostResponse;
    } catch (e) {
      return {
        data: [],
        error: {
          message: e.message,
        },
      };
    }
  }

  /**
   * Must delete all keys from request.pubkeys that are known to the validator client and exist in its persistent storage.
   * https://ethereum.github.io/keymanager-APIs/#/Remote%20Key%20Manager/DeleteRemoteKeys
   */
  public async deleteKeystores(pubkeys: string[]): Promise<Web3signerDeleteResponse> {
    try {
      const data = JSON.stringify({
        pubkeys: pubkeys,
      });
      return (await this.request("POST", this.fullUrl, data)) as Web3signerDeleteResponse;
    } catch (e) {
      return {
        data: [],
        error: {
          message: e.message,
        },
      };
    }
  }

  /**
   * List all remote validating pubkeys known to this validator client binary
   * https://ethereum.github.io/keymanager-APIs/#/Remote%20Key%20Manager/ListRemoteKeys
   */
  public async getKeystores(): Promise<Web3signerGetResponse> {
    try {
      return (await this.request("GET", this.fullUrl)) as Web3signerGetResponse;
    } catch (e) {
      return {
        data: [],
        error: {
          message: e.message,
        },
      };
    }
  }

  private async request(method: string, url: string, body?: any): Promise<any> {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (this.authToken) {
      headers = { ...headers, ...{ Authorization: `Bearer ${this.authToken}` } };
    }
    if (this.host) {
      headers = { ...headers, ...{ Host: this.host } };
    }
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
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
