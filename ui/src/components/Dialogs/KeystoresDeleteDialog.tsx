import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Button,
  DialogContentText,
  DialogActions,
  Alert,
} from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import { shortenPubkey, getEmoji } from "../../logic/Utils/dataUtils";
import { Web3SignerApi } from "../../apis/web3signerApi";
import {
  Web3signerDeleteResponse,
  Web3signerGetResponse,
} from "../../apis/web3signerApi/types";
import { importDialogBoxStyle } from "../../Styles/dialogStyles";
import WaitBox from "../WaitBox/WaitBox";
import DeletionWarning from "./DeletionWarning";

export default function KeystoresDeleteDialog({
  web3signerApi,
  rows,
  selectedRows,
  setSelectedRows,
  open,
  setOpen,
}: {
  web3signerApi: Web3SignerApi;
  rows: Web3signerGetResponse["data"];
  selectedRows: GridSelectionModel;
  setSelectedRows: (selectedRows: GridSelectionModel) => void;
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
    setSelectedRows([]);
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
        <Box sx={importDialogBoxStyle}>
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
                  <Alert
                    severity="warning"
                    sx={{ marginTop: 2, marginBottom: 2 }}
                    variant="filled"
                  >
                    It is strongly recommended to stop the validator and watch
                    at least 3 missed attestations in the explorer before
                    uploading the keys to another machine.
                  </Alert>

                  <Button
                    variant="contained"
                    href={`data:text/json;charset=utf-8,${encodeURIComponent(
                      keystoresDelete.slashing_protection
                    )}`}
                    download="slashing_protection.json"
                    sx={{ borderRadius: 3 }}
                  >
                    Download Slashing Protection Data
                  </Button>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              {requestInFlight ? (
                <WaitBox />
              ) : (
                <DialogContentText
                  id="alert-dialog-description"
                  component={"span"}
                >
                  <DeletionWarning rows={rows} selectedRows={selectedRows} />
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
            sx={{ marginRight: 1, borderRadius: 3 }}
          >
            Confirm
          </Button>
        ) : null}
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ borderRadius: 3 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
