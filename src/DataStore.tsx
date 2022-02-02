import { useEffect, useState } from "react";

const search = new URLSearchParams(window.location.search);
export const base_url = search.get("signer_url");
const endpoint = "/eth/v1/keystores";
const full_url = base_url + endpoint;
const auth_token = search.get("auth_token");

export type Response = {
  data: Result[];
  error?: { message: string };
  slashing_protection?: string;
};

export type Result = {
  status: string;
  message?: string;
};

export const useListFetcher = (
  refresh: boolean
): readonly { [key: string]: any }[] => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetch(full_url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRows(
          data.data.map((item: any, index: number) => {
            return {
              id: `${index}`,
              pubkey: item.validating_pubkey,
              readonly: item.readonly,
            };
          })
        );
      })
      .catch((error) => console.log(error));
  }, [refresh]);
  return rows;
};

export const importKeystores = async function (
  keystores: File[],
  passwords: string[],
  slashingProtection: File | undefined
): Promise<Response> {
  var data;
  if (slashingProtection) {
    data = JSON.stringify({
      keystores: await readText(keystores),
      passwords: passwords,
      slashing_protection: await slashingProtection?.text(),
    });
  } else {
    data = JSON.stringify({
      keystores: await readText(keystores),
      passwords: passwords,
    });
  }
  try {
    const response = await fetch(full_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      body: data,
    });
    if (response.ok) {
      return await response.json();
    } else {
      return { data: [], error: { message: response.statusText } };
    }
  } catch (e) {
    console.log(e);
    let message = "Unknown Error";
    if (e instanceof Error) message = e.message;
    return { data: [], error: { message: message } };
  }
};

export const deleteKeystores = async function (
  pubkeys: string[]
): Promise<Response> {
  const data = JSON.stringify({
    pubkeys: pubkeys,
  });
  try {
    const response = await fetch(full_url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      body: data,
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      return { data: [], error: { message: response.statusText } };
    }
  } catch (e) {
    console.log(e);
    let message = "Unknown Error";
    if (e instanceof Error) message = e.message;
    return { data: [], error: { message: message } };
  }
};

const readText = async function (files: File[]): Promise<string[]> {
  var data: string[] = [];
  for (var file of files) {
    const text = await file.text();
    data.push(text);
  }
  return data;
};

export const extractPubkey = async (file: File): Promise<string> => {
  const text = await file.text();
  const json = JSON.parse(text);
  return json.pubkey;
};

export const shortenPubkey = (key: string | undefined): string => {
  if (!key) return "";
  var prefix = "";
  var end = 4;
  if (!key.startsWith("0x")) {
    prefix = `0x`;
  } else {
    end = 6;
  }
  return `${prefix}${key.substring(0, end)}...${key.substring(
    key.length - 4,
    key.length
  )}`;
};

export function getEmoji(status: string) {
  switch (status) {
    case "error":
      return "❌";
    case "imported":
      return "✅";
    case "deleted":
      return "✅";
    default:
      return "⚠️";
  }
}
