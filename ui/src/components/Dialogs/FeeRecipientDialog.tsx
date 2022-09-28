import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { importDialogBoxStyle } from "../../Styles/dialogStyles";
import { SlideTransition } from "./Transitions";

export default function FeeRecipientDialog({
  open,
  setOpen,
  selectedValidatorPubkey,
  newFeeRecipient,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValidatorPubkey: string;
  newFeeRecipient: string;
}): JSX.Element {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      disableEscapeKeyDown={true}
      open={open}
      fullWidth={true}
      onClose={(event, reason) => {
        if (!reason) {
          handleClose();
        }
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={SlideTransition}
    >
      <DialogTitle id="alert-dialog-title">
        Changing validator fee recipient...
      </DialogTitle>
      <DialogContent>
        <Box sx={importDialogBoxStyle}>
          <TextField
            label="Current Fee Recipient"
            defaultValue="Current Fee Recipient"
            disabled={true}
            value={selectedValidatorPubkey}
          />
          <TextField
            sx={{ marginTop: 2 }}
            label="New Fee Recipient"
            defaultValue="New Fee Recipient"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" sx={{ margin: 2 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
