import { Box, CircularProgress, DialogContentText } from "@mui/material";
import { waitDialogBoxStyle } from "../../Styles/dialogStyles";

export default function WaitBox() {
  return (
    <Box sx={waitDialogBoxStyle}>
      <CircularProgress
        sx={{
          marginBottom: 4,
        }}
      />
      <DialogContentText id="alert-dialog-description">
        Please wait
      </DialogContentText>
    </Box>
  );
}
