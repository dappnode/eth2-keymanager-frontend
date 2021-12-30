import { GridSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const base_url = "http://localhost:9000/"; // TODO as query param
const endpoint = "eth/v1/keystores";
const full_url = base_url + endpoint;

export const useListFetcher = (): readonly { [key: string]: any }[] => {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        fetch(full_url, { method: 'GET' })
            .then((response) => response.json())
            .then((data) =>
                setRows(data.data.map((index: number, item: any) => {
                    return { id: `${index}`, pubkey: item.pubkey, readonly: item.readonly }
                })))
            .catch((error) => console.log(error));
    }, [])
    return rows
}

export const importKeystores = async function (keystores: File[], passwords: string[], slashingProtection: File | undefined) {
    const data = JSON.stringify({
        keystores: await readText(keystores),
        passwords: passwords,
        slashingProtection: slashingProtection ? await slashingProtection?.text() : null
    });
    try {
        const response = await fetch(full_url, {
            method: 'POST',
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