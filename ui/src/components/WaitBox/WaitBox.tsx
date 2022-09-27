import { Box, CircularProgress, DialogContentText } from "@mui/material";
import { waitDialogBox } from "../../Styles/importDialogStyles";

export default function WaitBox() {
  return (
    <Box sx={waitDialogBox}>
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
