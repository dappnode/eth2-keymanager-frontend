//External components
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import React from "react";

//Logic
import { useEffect, useState } from "react";
import { ValidatorApi } from "../../apis/validatorApi";
import { isEthAddress } from "../../logic/Utils/dataUtils";
import { validatorProxyApiParams } from "../../params";

//Styles
import { importDialogBoxStyle } from "../../Styles/dialogStyles";
import { SlideTransition } from "./Transitions";

export default function FeeRecipientDialog({
  open,
  setOpen,
  selectedRows,
  setSelectedRows,
  network,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedRows: GridSelectionModel;
  setSelectedRows: (selectedRows: GridSelectionModel) => void;
  network: string;
}): JSX.Element {
  const [newFeeRecipient, setNewFeeRecipient] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewFeeRecipientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewFeeRecipient(event.target.value);
  };

  //To hide success message after 5 seconds
  useEffect(() => {
    const timeId = setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [errorMessage, successMessage]);

  const consensusClient = "prysm"; //TODO: get consensus client from env

  const validatorApi = new ValidatorApi(
    validatorProxyApiParams,
    network,
    consensusClient
  );

  const updateFeeRecipients = async () => {};

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
        Edit Fee Recipient For Selected Validators
      </DialogTitle>

      {validatorApi ? (
        <>
          <DialogContent>
            <Box sx={importDialogBoxStyle}>
              <TextField
                onChange={handleNewFeeRecipientChange}
                sx={{ marginTop: 2 }}
                label="New Fee Recipient"
              />
              {successMessage && (
                <Alert
                  severity="success"
                  variant="filled"
                  sx={{ marginTop: 2 }}
                >
                  {successMessage}
                </Alert>
              )}
              {errorMessage && (
                <Alert severity="error" variant="filled" sx={{ marginTop: 2 }}>
                  {errorMessage}
                </Alert>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            {!errorMessage && (
              <Button
                onClick={() => updateFeeRecipients()}
                variant="contained"
                sx={{ margin: 2, borderRadius: 3 }}
                disabled={!isEthAddress(newFeeRecipient)}
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
          <Alert
            severity="error"
            sx={{ marginLeft: 4, marginRight: 4 }}
            variant="filled"
          >
            No valid consensus client selected
          </Alert>
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
