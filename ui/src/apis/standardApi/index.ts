import { ApiParams } from "../../types";

export class StandardApi {
  baseUrl: string;
  authToken?: string;
  host?: string;
  endpoint?: string;
  certFilePath?: string;
  proxyUrl?: string;
  consensusClient?: string;

  constructor(apiParams: ApiParams, proxyUrl?: string) {
    this.authToken = apiParams.authToken;
    this.host = apiParams.host;
    this.baseUrl = apiParams.baseUrl;
    this.endpoint = apiParams.apiPath;
    this.certFilePath = apiParams.certFilePath;
    this.consensusClient = apiParams.consensusClient;
    this.proxyUrl = proxyUrl;
  }

  protected async request(
    method: string,
    url: string,
    body?: any
  ): Promise<any> {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (this.authToken) {
      headers = {
        ...headers,
        ...{ Authorization: `Bearer ${this.authToken}` },
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

  protected async readText(files: File[]): Promise<string[]> {
    var data: string[] = [];
    for (var file of files) {
      const text = await file.text();
      data.push(text);
    }
    return data;
  }
}
