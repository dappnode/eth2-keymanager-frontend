import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Button,
  CircularProgress,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import { shortenPubkey, getEmoji } from "./DataStore";
import { Web3SignerApi } from "./web3signerApi";
import {
  Web3signerDeleteResponse,
  Web3signerGetResponse,
} from "./web3signerApi/types";

export default function KeystoresDeleteDialog({
  web3signerApi,
  rows,
  selectedRows,
  open,
  setOpen,
}: {
  web3signerApi: Web3SignerApi;
  rows: Web3signerGetResponse["data"];
  selectedRows: GridSelectionModel;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [keystoresDelete, setKeystoresDelete] =
    useState<Web3signerDeleteResponse>();
  const [requestInFlight, setRequestInFlight] = useState(false);

  async function deleteSelectedKeystores() {
    setKeystoresDelete(undefined);
    setRequestInFlight(true);
    const keystoresDelete = await web3signerApi.deleteKeystores({
      pubkeys: selectedRows.map(
        (row) => rows[parseInt(row.toString())].validating_pubkey
      ),
    });
    setRequestInFlight(false);
    setKeystoresDelete(keystoresDelete);
  }
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
    >
      <DialogTitle id="alert-dialog-title">
        {keystoresDelete ? "Done" : "Delete Keystores?"}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          {keystoresDelete?.error ? (
            `Error: ${keystoresDelete.error.message}`
          ) : keystoresDelete?.data ? (
            <div>
              {keystoresDelete.data.map((result, index) => (
                <div style={{ marginBottom: "20px" }}>
                  <Typography variant="h5" color="GrayText">
                    {shortenPubkey(rows[index]?.validating_pubkey)}
                  </Typography>
                  <Typography variant="h6">
                    <b>Status:</b> {result.status} {getEmoji(result.status)}
                  </Typography>
                  {result.message ? (
                    <Typography variant="h6">
                      <b>Message:</b> {result.message}
                    </Typography>
                  ) : null}
                </div>
              ))}
              {keystoresDelete.slashing_protection ? (
                <div>
                  <Button
                    variant="contained"
                    href={`data:text/json;charset=utf-8,${encodeURIComponent(
                      keystoresDelete.slashing_protection
                    )}`}
                    download="slashing_protection.json"
                  >
                    Download Slashing Protection Data
                  </Button>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              {requestInFlight ? (
                <Box
                  sx={{
                    margin: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress
                    sx={{
                      marginBottom: 4,
                    }}
                  />
                  <DialogContentText id="alert-dialog-description">
                    Please wait
                  </DialogContentText>
                </Box>
              ) : (
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete these keystores?
                  <ul>
                    {selectedRows.map((row, i) => (
                      <li key={i}>
                        {shortenPubkey(
                          rows[parseInt(row.toString())].validating_pubkey
                        )}
                      </li>
                    ))}
                  </ul>
                  After deletion, these keystores won't be used for signing
                  anymore and your slashing protection data will be downloaded.{" "}
                  <br />
                  <br />
                  <b>
                    Keep the slashing protection data for when you want to
                    import these keystores to a new validator.
                  </b>
                </DialogContentText>
              )}
            </div>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {!keystoresDelete && !requestInFlight ? (
          <Button
            onClick={() => deleteSelectedKeystores()}
            variant="contained"
            sx={{ marginRight: 1 }}
          >
            Confirm
          </Button>
        ) : null}
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
