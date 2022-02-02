import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridSelectionModel,
} from "@mui/x-data-grid";
import "./App.css";
import { useState } from "react";

const columns: GridColDef[] = [
  {
    field: "pubkey",
    headerName: "Validating Public Key",
    flex: 1,
    headerClassName: "tableHeader",
  },
  {
    field: "readonly",
    headerName: "Read Only",
    width: 120,
    align: "right",
    headerAlign: "right",
    headerClassName: "tableHeader",
  },
];

interface Props {
  rows: readonly { [key: string]: any }[];
  selectedRows: GridSelectionModel;
  setSelectedRows: (arg0: GridSelectionModel) => void;
}

export default function KeystoreList({
  rows,
  selectedRows,
  setSelectedRows,
}: Props) {
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

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 20, 50, 100]}
        onPageSizeChange={pageSizeChange}
        checkboxSelection
        onSelectionModelChange={selection}
      />
    </div>
  );
}
