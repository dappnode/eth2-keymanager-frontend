import Typography from "@mui/material/Typography";

export default function ToolBarTypography({
  text,
}: {
  text: string;
}): JSX.Element {
  return (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ flexGrow: 1, fontWeight: "bold" }}
    >
      {text}
    </Typography>
  );
}
