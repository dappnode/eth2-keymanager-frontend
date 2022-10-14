import { FeeRecipientPubkey, FeeRecipientPubkeyItem } from "./types";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

export default class FeeRecipientSaver {
  basePath = "./storage/";
  fileName: string;

  constructor() {
    if (!existsSync(this.basePath)) {
      mkdirSync(this.basePath);
    }
    this.fileName = this.basePath + "feeRecipients.json";
  }

  public saveFeeRecipients(feeRecipientFile: FeeRecipientPubkeyItem[]): void {
    writeFileSync(this.fileName, JSON.stringify(feeRecipientFile));
  }

  public readFeeRecipientJSONFile(): FeeRecipientPubkeyItem[] {
    try {
      const rawData = readFileSync(this.fileName, "utf8");
      const feeRecipientJSON: FeeRecipientPubkeyItem[] = JSON.parse(rawData);
      return feeRecipientJSON;
    } catch (e) {
      return [];
    }
  }

  public readFeeRecipientsFromFile(
    network: string,
    client: string
  ): FeeRecipientPubkey[] {
    const feeRecipientsJSONFile = this.readFeeRecipientJSONFile();
    console.log("feeRecipientsJSONFile", feeRecipientsJSONFile);
    const feeRecipientItem = feeRecipientsJSONFile.find(
      (item) => item.network === network && item.consensusClient === client
    );
    return feeRecipientItem.feeRecipients;
  }

  public appendFeeRecipientsToFile(
    network: string,
    client: string,
    feeRecipientPubkeys: FeeRecipientPubkey[]
  ): void {
    let feeRecipientsJSONFile = this.readFeeRecipientJSONFile();
    let feeRecipientItem = feeRecipientsJSONFile.find(
      (item) => item.network === network && item.consensusClient === client
    ) ?? {
      network: network,
      consensusClient: client,
      feeRecipients: [],
    };
    const feeRecipients = feeRecipientItem.feeRecipients;
    const newFeeRecipients = feeRecipientPubkeys.filter(
      (feeRecipientPubkey) =>
        !feeRecipients.find(
          (feeRecipient) => feeRecipient.pubkey === feeRecipientPubkey.pubkey
        )
    );
    feeRecipientItem.feeRecipients = feeRecipients.concat(newFeeRecipients);
    feeRecipientsJSONFile = feeRecipientsJSONFile.filter(
      (item) => item.network !== network || item.consensusClient !== client
    );
    feeRecipientsJSONFile.push(feeRecipientItem);
    this.saveFeeRecipients(feeRecipientsJSONFile);
  }
}
