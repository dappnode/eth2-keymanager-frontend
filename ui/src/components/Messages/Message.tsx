import { Alert } from "@mui/material";

export default function Message({
  message,
  severity,
}: {
  message: string;
  severity: "error" | "warning" | "info" | "success";
}): JSX.Element {
  return (
    <Alert variant="filled" severity={severity} style={{ marginTop: "2em" }}>
      {message}
    </Alert>
  );
}
