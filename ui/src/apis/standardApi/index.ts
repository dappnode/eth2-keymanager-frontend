import { ApiParams } from "../../types";
import axios from "axios";
const httpsAgent = require("https-agent");
const fs = require("fs");

export class StandardApi {
  baseUrl: string;
  authToken?: string;
  host?: string;
  endpoint?: string;
  certFilePath?: string;

  constructor(apiParams: ApiParams) {
    this.authToken = apiParams.authToken;
    this.host = apiParams.host;
    this.baseUrl = apiParams.baseUrl;
    this.endpoint = apiParams.apiPath;
    this.certFilePath = apiParams.certFilePath;
  }

  protected async request(
    method: string,
    url: string,
    body?: any
  ): Promise<any> {
    if (this.certFilePath) {
      return this.axiosRequest(method, url, body);
    }

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

  //Needed to include the certificate for the https request (Teku)
  private async axiosRequest(
    method: string,
    url: string,
    body?: any
  ): Promise<any> {
    const requestOptions = {
      url: url,
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      httpsAgent: new httpsAgent({
        rejectUnauthorized: false, //TODO IS THIS SAFE?
        pfx: fs.readFileSync(process.cwd() + this.certFilePath),
        passphrase: "dappnode",
      }),
      data: body ? body : "",
    };

    if (this.authToken) {
      requestOptions.headers = {
        ...requestOptions.headers,
        ...{ Authorization: `Bearer ${this.authToken}` },
      };
    }
    if (this.host) {
      requestOptions.headers = {
        ...requestOptions.headers,
        ...{ Host: this.host },
      };
    }

    const response = await axios.request(requestOptions);

    if (response.status.toString().startsWith("2")) return response.data; //TODO Check if this is correct
    throw new Error(response.statusText);
  }
}
