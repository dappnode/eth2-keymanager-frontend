//External components
import { GridColDef } from "@mui/x-data-grid";
import { Settings } from "@mui/icons-material";
import LinkIcon from "@mui/icons-material/Link";

export default function KeystoreColumns(
  setSeletectedValidatorPK: (arg0: string) => void,
  setIsDialogOpen: (arg0: boolean) => void
): GridColDef[] {
  return [
    {
      field: "validating_pubkey",
      headerName: "Validating Pubkey",
      description: "Validating Public Key",
      disableColumnMenu: true,
      flex: 1,
      headerClassName: "tableHeader",
      cellClassName: "tableCell",
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
      cellClassName: "tableCell",
    },
    {
      field: "validator_settings",
      headerName: "Settings",
      description: "Settings for this validator",
      disableReorder: true,
      disableColumnMenu: true,
      disableExport: true,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (rowData) => (
        <button
          style={{ color: "grey" }}
          onClick={(event) => {
            setSeletectedValidatorPK(rowData.row.validating_pubkey);
            setIsDialogOpen(true);
          }}
        >
          <Settings />
        </button>
      ),
      headerClassName: "tableHeader",
      cellClassName: "tableCell",
    },
  ];
}
