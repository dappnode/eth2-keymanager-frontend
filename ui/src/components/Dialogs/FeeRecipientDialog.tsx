import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ValidatorApi } from "../../apis/validatorApi";
import { validatorApiProxyUrl, validatorClientApiMap } from "../../params";
import { importDialogBoxStyle } from "../../Styles/dialogStyles";
import { SlideTransition } from "./Transitions";

export default function FeeRecipientDialog({
  open,
  setOpen,
  selectedValidatorPubkey,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValidatorPubkey: string;
}): JSX.Element {
  const [currentFeeRecipient, setCurrentFeeRecipient] = useState("");
  //const [newFeeRecipient, setNewCurrentFeeRecipient] = useState("");

  var newFeeRecipient = "";

  const handleClose = () => {
    setOpen(false);
  };

  const validatorApi = new ValidatorApi(
    validatorClientApiMap.get("prysm-prater")!, //TODO - get network from somewhere
    validatorApiProxyUrl
  );

  const getCurrentFeeRecipient = async () => {
    const currentFeeRecipient = await validatorApi.getFeeRecipient(
      selectedValidatorPubkey
    );

    setCurrentFeeRecipient(currentFeeRecipient.data?.ethaddress || ""); //TODO is this correct?
  };

  const setNewFeeRecipient = async () => {
    /*if (newFeeRecipient !== "") {
      //TODO - validate newFeeRecipient

      await validatorApi.setFeeRecipient(
        newFeeRecipient,
        selectedValidatorPubkey
      );
    } else {
      //TODO - show error message
    }*/
  };

  useEffect(() => {
    getCurrentFeeRecipient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValidatorPubkey]);

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
      <DialogTitle
        id="alert-dialog-title"
        sx={{ fontWeight: 700, fontSize: 24 }}
      >
        Changing validator fee recipient...
      </DialogTitle>
      <DialogContent>
        <Box sx={importDialogBoxStyle}>
          <TextField
            label="Current Fee Recipient"
            disabled={true}
            value={currentFeeRecipient}
          />
          <TextField
            sx={{ marginTop: 2 }}
            label="New Fee Recipient"
            defaultValue="New Fee Recipient"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{ margin: 2, borderRadius: 3 }}
        >
          Apply changes
        </Button>
        <Button
          onClick={setNewFeeRecipient}
          variant="outlined"
          sx={{ margin: 2, borderRadius: 3 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
