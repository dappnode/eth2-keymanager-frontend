import Toolbar from "@mui/material/Toolbar";
import ToolBarTypography from "../../Styles/TopBarStyle";

export default function ToolBar({
  network,
}: {
  network?: string;
}): JSX.Element {
  return (
    <Toolbar>
      <ToolBarTypography
        text={`ETH2 Key Manager ${network ? `(${network})` : ""}`}
      />
    </Toolbar>
  );
}
