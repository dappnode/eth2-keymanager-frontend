import Toolbar from "@mui/material/Toolbar";
import { HeaderTypography } from "../../Styles/Typographies";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Card } from "@mui/material";

export default function ToolBar({
  network,
  signerStatus,
}: {
  network?: string;
  signerStatus: string;
}): JSX.Element {
  return (
    <Toolbar>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          lineHeight: "50px",
        }}
      >
        <img src="/assets/dappnode_logo.png" alt="logo" height={50} />
        <HeaderTypography
          sx={{ flexGrow: 1, fontWeight: "bold" }}
          text={"ETH2 Key Manager"}
        />
        <Box className="box">
          <Card
            sx={{
              padding: 1,
              borderRadius: 5,
              marginLeft: 2,
              fontWeight: 700,
              fontSize: 18,
              lineHeight: "30px",
              backgroundColor: "#000000",
            }}
          >
            {network}
          </Card>
        </Box>
      </div>
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
