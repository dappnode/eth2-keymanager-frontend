import { Box, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { buttonsBoxStyle } from "../../Styles/buttonsBoxStyles";
//Icons
import BackupIcon from "@mui/icons-material/Backup";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { BeaconchaUrlBuildingStatus } from "../../types";

export default function ButtonsBox({
  isTableEmpty,
  setOpen,
  validatorSummaryURL,
  summaryUrlBuildingStatus,
  loadSummaryUrl,
}: {
  isTableEmpty: boolean;
  setOpen(open: boolean): void;
  validatorSummaryURL: string;
  summaryUrlBuildingStatus: BeaconchaUrlBuildingStatus;
  loadSummaryUrl(): void;
}): JSX.Element {
  return (
    <Box sx={buttonsBoxStyle}>
      <Link to={{ pathname: "/import", search: window.location.search }}>
        <Button
          variant="contained"
          size="large"
          sx={{ borderRadius: 3 }}
          endIcon={<BackupIcon />}
        >
          Import Keystores
        </Button>
      </Link>
      <Button
        variant="contained"
        size="large"
        color="error"
        disabled={isTableEmpty}
        sx={{ marginRight: 4, borderRadius: 3 }}
        endIcon={<DeleteForeverIcon />}
        onClick={() => setOpen(true)}
      >
        Delete Keystores
      </Button>

      {summaryUrlBuildingStatus === BeaconchaUrlBuildingStatus.NotStarted &&
      !isTableEmpty ? (
        <Button
          variant="contained"
          size="large"
          sx={{ marginRight: 4, borderRadius: 3 }}
          onClick={loadSummaryUrl}
        >
          Load summary dashboard
        </Button>
      ) : summaryUrlBuildingStatus === BeaconchaUrlBuildingStatus.NoIndexes ? (
        <></>
      ) : summaryUrlBuildingStatus === BeaconchaUrlBuildingStatus.Success ? (
        <Button
          variant="contained"
          size="large"
          sx={{ marginRight: 4, borderRadius: 3 }}
          target="_blank"
          href={validatorSummaryURL}
        >
          Go to summary dashboard
        </Button>
      ) : (
        <>
          <Button
            variant="contained"
            size="large"
            sx={{ marginRight: 4, borderRadius: 3 }}
            disabled={true}
          >
            Loading summary dashboard...
            <CircularProgress size={24} sx={{ marginLeft: 2 }} />
          </Button>
        </>
      )}
    </Box>
  );
}
