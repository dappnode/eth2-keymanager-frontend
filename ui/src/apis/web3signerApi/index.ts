import { StandardApi } from "../standardApi";
import {
  Web3signerDeleteResponse,
  Web3signerGetResponse,
  Web3signerPostResponse,
  Web3signerPostRequest,
  Web3signerDeleteRequest,
  Web3signerHealthcheckResponse,
} from "./types";

/**
 * Key Manager API standard
 * https://ethereum.github.io/keymanager-APIs/
 */
export class Web3SignerApi extends StandardApi {
  /**
   * Local Key Manager endpoint
   * https://ethereum.github.io/keymanager-APIs/#/Local%20Key%20Manager/
   */
  keymanagerEndpoint = "/eth/v1/keystores";

  /**
   * Server Healthcheck endpoint
   * https://consensys.github.io/web3signer/web3signer-eth2.html#tag/Server-Health-Status
   */
  serverStatusEndpoint = "/healthcheck";

  /**
   * Import remote keys for the validator client to request duties for.
   * https://ethereum.github.io/keymanager-APIs/#/Local%20Key%20Manager/ListKeys
   */
  public async importKeystores(
    postRequest: Web3signerPostRequest
  ): Promise<Web3signerPostResponse> {
    try {
      var data;
      if (postRequest.slashingProtection) {
        data = {
          keystores: await this.readText(postRequest.keystores),
          passwords: postRequest.passwords,
          slashing_protection: await postRequest.slashingProtection?.text(),
        };
      } else {
        data = {
          keystores: await this.readText(postRequest.keystores),
          passwords: postRequest.passwords,
        };
      }
      return (await this.request(
        "POST",
        this.baseUrl + this.keymanagerEndpoint,
        JSON.stringify(data)
      )) as Web3signerPostResponse;
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
   * https://ethereum.github.io/keymanager-APIs/#/Local%20Key%20Manager/ImportKeystores
   */
  public async deleteKeystores(
    deleteRequest: Web3signerDeleteRequest
  ): Promise<Web3signerDeleteResponse> {
    try {
      const data = JSON.stringify({
        pubkeys: deleteRequest.pubkeys,
      });
      return (await this.request(
        "DELETE",
        this.baseUrl + this.keymanagerEndpoint,
        data
      )) as Web3signerDeleteResponse;
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
      return (await this.request(
        "GET",
        this.baseUrl + this.keymanagerEndpoint
      )) as Web3signerGetResponse;
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
   * Checks the Web3Signer server status. Confirms if Web3Signer is connected and running.
   * https://consensys.github.io/web3signer/web3signer-eth2.html#tag/Reload-Signer-Keys/operation/UPCHECK
   */
  public async getStatus(): Promise<Web3signerHealthcheckResponse> {
    try {
      return (await this.request(
        "GET",
        this.baseUrl + this.serverStatusEndpoint
      )) as Web3signerHealthcheckResponse;
    } catch (e) {
      return {
        status: "UNKNOWN",
        checks: [],
        outcome: e.message,
      };
    }
  }
}
