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
import Message from "../Messages/Message";
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
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewFeeRecipientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewFeeRecipient(event.target.value);
    setErrorMessage("");
  };

  const validatorApi = new ValidatorApi(
    validatorClientApiMap.get("teku-prater")!, //TODO - get client and network from somewhere
    validatorApiProxyUrl
  );

  const updateFeeRecipient = async () => {
    if (isEthAddress(newFeeRecipient)) {
      try {
        await validatorApi.setFeeRecipient(
          newFeeRecipient,
          selectedValidatorPubkey
        );

        setCurrentFeeRecipient(newFeeRecipient);
      } catch (error) {
        setErrorMessage("Error updating fee recipient");
      }
    } else {
      setErrorMessage("Invalid address");
    }
  };

  useEffect(() => {
    const getCurrentFeeRecipient = async () => {
      try {
        const currentFeeRecipient = await validatorApi.getFeeRecipient(
          selectedValidatorPubkey
        );

        setCurrentFeeRecipient(currentFeeRecipient.data?.ethaddress || ""); //TODO is this correct?
      } catch (error) {
        setErrorMessage("Error getting current fee recipient");
      }
    };

    getCurrentFeeRecipient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFeeRecipient, selectedValidatorPubkey]);

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

      {validatorApi ? (
        <>
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
          {errorMessage && (
            <Message
              message={errorMessage}
              severity="error"
              sx={{ marginLeft: 4, marginRight: 4 }}
            />
          )}
          <DialogActions>
            {!errorMessage && (
              <Button
                onClick={updateFeeRecipient}
                variant="contained"
                sx={{ margin: 2, borderRadius: 3 }}
              >
                Apply changes
              </Button>
            )}
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ margin: 2, borderRadius: 3 }}
            >
              Close
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <Message
            message="No consensus client selected"
            severity="error"
            sx={{ marginLeft: 4, marginRight: 4 }}
          />
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ margin: 2, borderRadius: 3 }}
            >
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
