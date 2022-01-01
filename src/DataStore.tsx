import { GridSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const base_url = "http://localhost:9000/"; // TODO as query param
const endpoint = "eth/v1/keystores";
const full_url = base_url + endpoint;

export type ImportResponse = {
    data: ImportResult[]
    error?: { message: string }
}

export type ImportResult = {
    status: string,
    message?: string
}

export const useListFetcher = (): readonly { [key: string]: any }[] => {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        fetch(full_url, { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
                setRows(data.data.map((item: any, index: number) => {
                    return { id: `${index}`, pubkey: item.validating_pubkey, readonly: item.readonly }
                }));
            })
            .catch((error) => console.log(error));
    }, [])
    return rows
}

export const importKeystores = async function (
    keystores: File[],
    passwords: string[],
    slashingProtection: File | undefined): Promise<ImportResponse> {
    const data = JSON.stringify({
        keystores: await readText(keystores),
        passwords: passwords,
        slashingProtection: slashingProtection ? await slashingProtection?.text() : null
    });
    console.log(data)
    try {
        const response = await fetch(full_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        });
        if (response.ok) {
            const json = await response.json();
            console.log(json);
            return json
        } else {
            return { data: [], error: { message: response.statusText } };
        }

    } catch (e) {
        console.log(e)
        let message = 'Unknown Error'
        if (e instanceof Error) message = e.message
        return { data: [], error: { message: message } };
    }
}

export const deleteKeystores = async function (pubkeys: string[]) {
    const data = JSON.stringify({
        pubkeys: pubkeys
    });
    try {
        const response = await fetch(full_url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data,
        });
        const json = await response.json()
    } catch (e) {
        console.log(e)
    }
}

const readText = async function (files: File[]): Promise<string[]> {
    var data: string[] = []
    for (var file of files) {
        const text = await file.text();
        data.push(text)
    }
    return data
}

export const extractPubkey = async (file: File): Promise<string> => {
    const text = await file.text();
    const json = JSON.parse(text);
    return json.pubkey;
}

export const shortenPubkey = (key: string | undefined): string => {
    if(!key) return ''
    var prefix = ''
    if (!key.startsWith('0x')) {
        prefix = `0x`
    }
    return `${prefix}${key.substring(0, 4)}...${key.substring(key.length - 4, key.length)}`
}