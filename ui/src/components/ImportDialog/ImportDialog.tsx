import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  CircularProgress,
  DialogContentText,
  Button,
  DialogActions,
} from "@mui/material";

import { Web3signerPostResponse } from "../../apis/web3signerApi/types";
import { getEmoji, shortenPubkey } from "../../DataStore";
import { KeystoreInfo } from "../../types";

export default function ImportDialog({
  open,
  setOpen,
  keystoresPostResponse,
  acceptedFiles,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  keystoresPostResponse: Web3signerPostResponse | undefined;
  acceptedFiles: KeystoreInfo[];
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
    >
      <DialogTitle id="alert-dialog-title">
        {keystoresPostResponse?.data ? "Import Completed" : "Importing..."}
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
          {keystoresPostResponse ? (
            keystoresPostResponse.error ? (
              `Error: ${keystoresPostResponse.error.message}`
            ) : (
              <div>
                {keystoresPostResponse.data.map((result, index) => (
                  <div style={{ marginBottom: "20px" }} key={index}>
                    <Typography variant="h5" color="GrayText">
                      {shortenPubkey(acceptedFiles[index]?.pubkey)}
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
              </div>
            )
          ) : (
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
          )}
        </Box>
      </DialogContent>
      {keystoresPostResponse ? (
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
}
