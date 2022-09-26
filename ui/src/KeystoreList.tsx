import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridSelectionModel,
} from "@mui/x-data-grid";
import "./App.css";
import { useState } from "react";
import { Web3signerGetResponse } from "./apis/web3signerApi/types";
import LinkIcon from "@mui/icons-material/Link";

const columns: GridColDef[] = [
  {
    field: "validating_pubkey",
    headerName: "Validating Public Key",
    description: "Validating Public Key (click to copy)",

    flex: 1,
    headerClassName: "tableHeader",
  },
  {
    field: "beaconcha_url",
    headerName: "URL",
    description: "Beaconcha URL to track the status of this validator",
    disableReorder: true,
    disableColumnMenu: true,
    disableExport: true,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (rowData) => (
      <a
        style={{ color: "grey" }}
        href={rowData.row.beaconcha_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkIcon />
      </a>
    ),
    headerClassName: "tableHeader",
  },
];

export default function KeystoreList({
  rows,
  setSelectedRows,
  network,
}: {
  rows: Web3signerGetResponse["data"];
  setSelectedRows: (arg0: GridSelectionModel) => void;
  network: string;
}) {
  const selection = (
    selectionModel: GridSelectionModel,
    details: GridCallbackDetails
  ) => {
    setSelectedRows(selectionModel);
  };

  const [pageSize, setPageSize] = useState(10);
  const pageSizeChange = (pageSize: number, details: GridCallbackDetails) => {
    setPageSize(pageSize);
  };

  const customRows = rows.map((row, index) => ({
    // only show first 12 chars from pubkey
    validating_pubkey: row.validating_pubkey,
    beaconcha_url:
      network === "mainnet"
        ? `https://beaconcha.in/validator/${row.validating_pubkey}`
        : network === "gnosis"
        ? `https://beacon.gnosischain.in/validator/${row.validating_pubkey}`
        : network === "prater"
        ? `https://prater.beaconcha.in/validator/${row.validating_pubkey}`
        : "-",
    id: index,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={customRows}
        onCellClick={(params) => {
          if (params.field === "validating_pubkey") {
            navigator.clipboard.writeText(params.value);
          }
        }}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 20, 50, 100]}
        onPageSizeChange={pageSizeChange}
        checkboxSelection
        disableSelectionOnClick={true}
        onSelectionModelChange={selection}
      />
    </div>
  );
}
