//External components
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

//Logic
import { useEffect, useState } from "react";
import { ValidatorApi } from "../../apis/validatorApi";
import { isEthAddress } from "../../logic/Utils/dataUtils";
import { validatorApiProxyUrl, validatorClientApiMap } from "../../params";

//Styles
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
  const [newFeeRecipient, setNewFeeRecipient] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewFeeRecipientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewFeeRecipient(event.target.value);
  };

  const validatorApi = new ValidatorApi(
    validatorClientApiMap.get("prysm-prater")!, //TODO - get client and network from somewhere
    validatorApiProxyUrl
  );

  const updateFeeRecipient = async () => {
    if (isEthAddress(newFeeRecipient)) {
      await validatorApi.setFeeRecipient(
        newFeeRecipient,
        selectedValidatorPubkey
      ); //TODO - Catch errors

      setCurrentFeeRecipient(newFeeRecipient);
    } else {
      //TODO Show error
    }
  };

  useEffect(() => {
    const getCurrentFeeRecipient = async () => {
      const currentFeeRecipient = await validatorApi.getFeeRecipient(
        selectedValidatorPubkey
      );

      setCurrentFeeRecipient(currentFeeRecipient.data?.ethaddress || ""); //TODO is this correct?
    };

    getCurrentFeeRecipient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newFeeRecipient, selectedValidatorPubkey]);

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
            onChange={handleNewFeeRecipientChange}
            sx={{ marginTop: 2 }}
            label="New Fee Recipient"
            defaultValue="New Fee Recipient"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={updateFeeRecipient}
          variant="contained"
          sx={{ margin: 2, borderRadius: 3 }}
        >
          Apply changes
        </Button>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ margin: 2, borderRadius: 3 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
