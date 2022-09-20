import { Alert } from "@mui/material";

export default function ErrorMessage({
  message,
}: {
  message: string;
}): JSX.Element {
  return (
    <Alert variant="filled" severity="error" style={{ marginTop: "2em" }}>
      {message}
    </Alert>
  );
}
