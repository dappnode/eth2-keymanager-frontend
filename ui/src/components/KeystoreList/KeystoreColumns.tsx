//External components
import { GridColDef } from "@mui/x-data-grid";
import LinkIcon from "@mui/icons-material/Link";

export default function KeystoreColumns(): GridColDef[] {
  return [
    {
      field: "validating_pubkey",
      headerName: "Validating Public Key",
      description: "Validating Public Key",
      disableColumnMenu: true,
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
}
