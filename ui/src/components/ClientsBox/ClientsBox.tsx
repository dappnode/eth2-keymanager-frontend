import { Box, Card } from "@mui/material";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";

export default function ClientsBox({
  consensusClient,
  executionClient,
}: {
  consensusClient: string;
  executionClient: string;
}): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box className="box">
        <Card sx={{ padding: 4, borderRadius: 5 }}>{consensusClient}</Card>
      </Box>
      <ElectricalServicesIcon
        sx={{
          transform: "scale(2)",
          marginRight: 2,
          marginLeft: 2,
        }}
      />
      <Box className="box">
        <Card sx={{ padding: 4, borderRadius: 5 }}>{executionClient}</Card>
      </Box>
    </div>
  );
}
