//External components
import { AppBar } from "@mui/material";

//Internal components
import ToolBar from "./ToolBar";

export default function TopBar({
  network,
  signerStatus,
}: {
  network?: string;
  signerStatus: string;
}): JSX.Element {
  return (
    <AppBar position="static">
      <ToolBar network={network} signerStatus={signerStatus} />
    </AppBar>
  );
}
