import { Alert, SxProps } from "@mui/material";

export default function Message({
  message,
  severity,
  sx,
}: {
  message: string;
  severity: "error" | "warning" | "info" | "success";
  sx?: SxProps;
}): JSX.Element {
  return (
    <Alert variant="filled" severity={severity} sx={sx}>
      {message}
    </Alert>
  );
}
