import { GridSelectionModel } from "@mui/x-data-grid";
import { Web3signerGetResponse } from "../../apis/web3signerApi/types";
import { shortenPubkey } from "../../logic/Utils/dataUtils";

export default function DeletionWarning({
  selectedRows,
  rows,
}: {
  selectedRows: GridSelectionModel;
  rows: Web3signerGetResponse["data"];
}): JSX.Element {
  return (
    <>
      Are you sure you want to delete these keystores?
      <ul>
        {selectedRows.map((row, i) => (
          <li key={i}>
            {shortenPubkey(rows[parseInt(row.toString())].validating_pubkey)}
          </li>
        ))}
      </ul>
      After deletion, these keystores won't be used for signing anymore and your
      slashing protection data will be downloaded. <br />
      <br />
      <b>
        Keep the slashing protection data for when you want to import these
        keystores to a new validator.
      </b>
    </>
  );
}
