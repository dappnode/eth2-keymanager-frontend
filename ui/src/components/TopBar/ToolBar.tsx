import Toolbar from "@mui/material/Toolbar";
import { HeaderTypography } from "../../Styles/Typographies";

export default function ToolBar({
  network,
}: {
  network?: string;
}): JSX.Element {
  return (
    <Toolbar>
      <img src="/assets/dappnode_logo.png" alt="logo" height={50} />
      <HeaderTypography
        text={`ETH2 Key Manager ${network && `(${network})`}`}
      />
    </Toolbar>
  );
}
