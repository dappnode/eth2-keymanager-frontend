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
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, [errorMessage, successMessage]);

  const validatorApiParams = validatorClientApiMap.get("prysm-prater"); //TODO: Change this to a dynamic value

  const validatorApi = validatorApiParams
    ? new ValidatorApi(validatorApiParams, validatorApiProxyUrl)
    : null;

  const fetchCurrentFeeRecipient = async (): Promise<string> => {
    if (!validatorApi) return "";

    let feeRecipient: string | undefined = "";
    try {
      const currentFeeRecipient = await validatorApi.getFeeRecipient(
        selectedValidatorPubkey
      );

      feeRecipient = currentFeeRecipient.data?.ethaddress;

      if (feeRecipient) {
        setCurrentFeeRecipient(feeRecipient);
        setSuccessMessage("Fee recipient fetched successfully");
      } else {
        setCurrentFeeRecipient("");
        setErrorMessage("Fee recipient not found");
        console.error(currentFeeRecipient.message?.message);
      }
    } catch (error) {
      setErrorMessage("Error getting current fee recipient");
    }
    return feeRecipient ?? "";
  };

  const updateFeeRecipient = async (newFeeRecipient: string) => {
    if (!validatorApi) return;

    if (newFeeRecipient === currentFeeRecipient) {
      setSuccessMessage("Fee recipient updated successfully");
    } else {
      if (isEthAddress(newFeeRecipient)) {
        try {
          await validatorApi.setFeeRecipient(
            newFeeRecipient,
            selectedValidatorPubkey
          );

          const feeRecipient = await fetchCurrentFeeRecipient();

          if (feeRecipient === newFeeRecipient) {
            setSuccessMessage("Fee recipient updated successfully");
          } else {
            setErrorMessage("Error updating fee recipient");
          }
        } catch (error) {
          setErrorMessage("Error updating fee recipient");
        }
      } else {
        setErrorMessage("Invalid address");
      }
    }
  };

  useEffect(() => {
    setErrorMessage("");
    if (selectedValidatorPubkey) {
      fetchCurrentFeeRecipient();
    }
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
        Changing validator fee recipient
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
                onClick={() => updateFeeRecipient(newFeeRecipient)}
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
