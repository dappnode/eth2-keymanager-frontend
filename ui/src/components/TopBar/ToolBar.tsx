import Toolbar from "@mui/material/Toolbar";
import { HeaderTypography } from "../../Styles/Typographies";
import { CheckCircle, Cancel, QuestionMark } from "@mui/icons-material";
import { Box, Card, CircularProgress, Tooltip } from "@mui/material";

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
            <Tooltip title="Signer is UP">
              <CheckCircle color="success" />
            </Tooltip>
          ) : signerStatus === "DOWN" ? (
            <Tooltip title="Signer is DOWN">
              <Cancel color="error" />
            </Tooltip>
          ) : signerStatus === "LOADING" ? (
            <Tooltip title="Web3Signer status is loading">
              <CircularProgress size={"20px"} />
            </Tooltip>
          ) : (
            <Tooltip title="Web3Signer is not properly connected. Its URL might be wrong">
              <QuestionMark color="warning" />
            </Tooltip>
          )}
        </Box>
      </div>
    </Toolbar>
  );
}
