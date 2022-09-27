import { SxProps } from "@mui/material";
import Typography from "@mui/material/Typography";

export function HeaderTypography({
  text,
  sx,
}: {
  text: string;
  sx?: SxProps;
}): JSX.Element {
  return (
    <Typography variant="h6" noWrap component="div" sx={sx}>
      {text}
    </Typography>
  );
}

export function SecondaryInfoTypography({
  text,
  sx,
}: {
  text: string;
  sx?: SxProps;
}): JSX.Element {
  return (
    <Typography variant="body2" color="GrayText" sx={sx}>
      <i>{text}</i>
    </Typography>
  );
}
