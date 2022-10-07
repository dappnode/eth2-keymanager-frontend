import Toolbar from "@mui/material/Toolbar";
import { HeaderTypography } from "../../Styles/Typographies";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box } from "@mui/material";

export default function ToolBar({
  network,
  signerStatus,
}: {
  network?: string;
  signerStatus: string;
}): JSX.Element {
  return (
    <Toolbar>
      <img src="/assets/dappnode_logo.png" alt="logo" height={50} />
      <HeaderTypography
        sx={{ flexGrow: 1, fontWeight: "bold" }}
        text={`ETH2 Key Manager ${network && `(${network})`}`}
      />
      <div style={{ marginLeft: "auto" }}>
        <Box
          sx={{
            padding: 0.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HeaderTypography
            sx={{
              fontWeight: "bold",
              display: "center",
              marginRight: 1,
              marginTop: 0.5,
            }}
            text="Signer"
          />
          {signerStatus === "UP" ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="error" />
          )}
        </Box>
      </div>
    </Toolbar>
  );
}
