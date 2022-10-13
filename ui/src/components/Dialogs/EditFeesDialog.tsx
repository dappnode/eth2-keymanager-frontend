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
import { Web3signerGetResponse } from "../../apis/web3signerApi/types";
import { isEthAddress } from "../../logic/Utils/dataUtils";
import { burnAddress, validatorProxyApiParams } from "../../params";

//Styles
import { importDialogBoxStyle } from "../../Styles/dialogStyles";
import WaitBox from "../WaitBox/WaitBox";
import { SlideTransition } from "./Transitions";

export default function FeeRecipientDialog({
  open,
  setOpen,
  rows,
  selectedRows,
  setSelectedRows,
  network,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  rows: Web3signerGetResponse["data"];

  selectedRows: GridSelectionModel;
  setSelectedRows: (selectedRows: GridSelectionModel) => void;
  network: string;
}): JSX.Element {
  const [newFeeRecipient, setNewFeeRecipient] = useState("");
  const [wrongPostPubkeys, setWrongPostPubkeys] = useState(new Array<string>());
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
    setSuccessMessage("");
    setWrongPostPubkeys(new Array<string>());
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
  }, [successMessage]);

  const consensusClient = "prysm"; //TODO: get consensus client from env

  const validatorApi = new ValidatorApi(
    validatorProxyApiParams,
    network,
    consensusClient
  );

  const fetchCurrentFeeRecipient = async (pubkey: string): Promise<string> => {
    if (!validatorApi) return "";

    let feeRecipient: string | undefined = "";
    try {
      const feeRecipientResponse = await validatorApi.getFeeRecipient(pubkey);

      feeRecipient = feeRecipientResponse.data?.ethaddress;
    } catch (error) {
      console.log("Error getting current fee recipient");
    } finally {
      return feeRecipient || "";
    }
  };

  const updateFeeRecipients = async (newFeeRecipient: string) => {
    if (!validatorApi) return;

    if (consensusClient.includes("teku") && newFeeRecipient === burnAddress) {
      setErrorMessage(
        "Teku does not allow to set fee recipient to burn address"
      );
    } else {
      if (isEthAddress(newFeeRecipient)) {
        let error = false;

        const validatorPubkeys = selectedRows.map(
          (row) => rows[parseInt(row.toString())].validating_pubkey
        );

        setLoading(true);

        for (const pubkey of validatorPubkeys) {
          try {
            await validatorApi.setFeeRecipient(newFeeRecipient, pubkey);
          } catch (err) {
            setWrongPostPubkeys((prevState) => [...prevState, pubkey]);
            error = true;
            continue;
          }

          const feeRecipientGet = await fetchCurrentFeeRecipient(pubkey);

          if (feeRecipientGet !== newFeeRecipient) {
            setWrongPostPubkeys((prevState) => [...prevState, pubkey]);
            error = true;
          }
        }

        setLoading(false);

        if (!error) {
          setSuccessMessage("Fee recipients updated successfully");
        }
      } else {
        setErrorMessage("Invalid address");
      }
    }
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
              {wrongPostPubkeys.length > 0 && (
                <Alert severity="error" variant="filled" sx={{ marginTop: 2 }}>
                  There was an error updating fee recipient for the following
                  validators: {wrongPostPubkeys.join(", ")}
                </Alert>
              )}
            </Box>
          </DialogContent>
          {!loading ? (
            <DialogActions>
              {!errorMessage && (
                <Button
                  onClick={() => updateFeeRecipients(newFeeRecipient)}
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
          ) : (
            <WaitBox />
          )}
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
