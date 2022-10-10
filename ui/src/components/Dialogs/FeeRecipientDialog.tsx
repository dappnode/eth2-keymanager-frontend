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
import { burnAddress, validatorProxyApiParams } from "../../params";

//Styles
import { importDialogBoxStyle } from "../../Styles/dialogStyles";
import { SlideTransition } from "./Transitions";

export default function FeeRecipientDialog({
  open,
  setOpen,
  selectedValidatorPubkey,
  network,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValidatorPubkey: string;
  network: string;
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
      setErrorMessage("");
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [errorMessage, successMessage]);

  const consensusClient = "teku"; //TODO: get consensus client from env

  const validatorApi = new ValidatorApi(
    validatorProxyApiParams,
    network,
    consensusClient
  );

  const fetchCurrentFeeRecipient = async (): Promise<string> => {
    if (!validatorApi) return "";

    let feeRecipient: string | undefined = "";
    try {
      const feeRecipientResponse = await validatorApi.getFeeRecipient(
        selectedValidatorPubkey
      );

      feeRecipient = feeRecipientResponse.data?.ethaddress;

      if (feeRecipient) {
        setCurrentFeeRecipient(feeRecipient);
        console.log("Fee recipient fetched successfully");
      } else {
        setCurrentFeeRecipient("");
        setErrorMessage("Fee recipient not found");
        console.error(feeRecipientResponse.message?.message);
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
    } else if (
      consensusClient.includes("teku") &&
      newFeeRecipient === burnAddress
    ) {
      setErrorMessage(
        "Teku does not allow to set fee recipient to burn address"
      );
    } else {
      if (isEthAddress(newFeeRecipient)) {
        try {
          await validatorApi.setFeeRecipient(
            newFeeRecipient,
            selectedValidatorPubkey
          );

          const feeRecipientResponse = await fetchCurrentFeeRecipient();

          if (feeRecipientResponse === newFeeRecipient) {
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
