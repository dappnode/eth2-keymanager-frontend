import "./App.css";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DropEvent } from "react-dropzone";
import { useState } from "react";
import FileDrop from "./FileDrop";
import BackupIcon from "@mui/icons-material/Backup";
import CloseIcon from "@mui/icons-material/Close";
import { extractPubkey, getEmoji, shortenPubkey } from "./DataStore";
import { KeystoreInfo } from "./types";
import { Web3SignerApi } from "./web3signerApi";
import { Web3signerPostResponse } from "./web3signerApi/types";

export default function ImportScreen({ web3signerApi }: { web3signerApi: Web3SignerApi }) {
  const [keystoresPostResponse, setKeystoresPostResponse] = useState<Web3signerPostResponse>();
  const [open, setOpen] = useState(false);
  const [acceptedFiles, setAcceptedFiles] = useState<KeystoreInfo[]>([]);
  const [passwords, setPasswords] = useState<string[]>([]);

  const keystoreFilesCallback = async (files: File[], event: DropEvent) => {
    const keystoresToAdd: KeystoreInfo[] = [];
    const passwordsToAdd: string[] = [];
    for (var file of files) {
      const pubkey = await extractPubkey(file);
      if (pubkey) {
        if (acceptedFiles.some((e) => e.pubkey === pubkey) === false) {
          keystoresToAdd.push({ file: file, pubkey: pubkey });
          passwordsToAdd.push("");
        }
      }
    }
    setAcceptedFiles([...acceptedFiles].concat(keystoresToAdd));
    setPasswords([...passwords].concat(passwordsToAdd));
  };

  const [slashingFile, setSlashingFile] = useState<File>();
  const slashingFilesCallback = (files: File[], event: DropEvent) => {
    setSlashingFile(files[0]);
  };

  const passwordEntered = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
    const p = event.target.value;
    const newList = Array.from(passwords);
    newList[index] = p;
    setPasswords(newList);
  };

  // FILE CARDS
  const files = acceptedFiles
    ? Array.from(acceptedFiles).map((fileInfo, index) => (
        <Card key={index} raised sx={{ padding: 2, marginTop: 4, width: "80%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "left",
            }}
          >
            <Typography variant="h6" sx={{ flex: 1 }}>
              <b>✅ {fileInfo.file.name}</b> - {shortenPubkey(fileInfo.pubkey)}
            </Typography>
            <a
              href="/#"
              onClick={() => {
                var indexToRemove = acceptedFiles.indexOf(fileInfo);
                setAcceptedFiles(acceptedFiles.filter((f, index) => index !== indexToRemove));
                setPasswords(passwords.filter((f, index) => index !== indexToRemove));
              }}
            >
              <CloseIcon />
            </a>
          </Box>
          <TextField
            id={`outlined-password-input-${index}`}
            label="Keystore Password"
            type="password"
            onChange={(event) => passwordEntered(event, index)}
            sx={{ marginTop: 2, width: "60%" }}
          />
        </Card>
      ))
    : [];

  // SLASHING PROTECTION SWITCH
  const [slashingProtectionIncluded, setSlashingProtectionIncluded] = useState(true);
  const onSlashingChecked = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setSlashingProtectionIncluded(checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialog = (
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
              <DialogContentText id="alert-dialog-description">Please wait</DialogContentText>
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

  return (
    <div>
      <Box
        sx={{
          margin: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Card
          sx={{
            padding: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginBottom: 4,
            }}
          >
            <b>Import Validator Keystore(s)</b>
          </Typography>
          <Typography>Upload any keystore JSON file(s).</Typography>
          <Typography variant="body2" sx={{ marginBottom: 4 }} color="GrayText">
            <i>
              Keystores files are usually named keystore-xxxxxxxx.json and were created in the Ethereum launchpad
              deposit CLI. Do not upload the deposit_data.json file.
              <br />
            </i>
          </Typography>
          <FileDrop callback={keystoreFilesCallback} />

          {files}

          <Box
            sx={{
              marginTop: 8,
              marginBottom: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "left",
            }}
          >
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              <b>Import slashing protection data? (recommended)</b>
            </Typography>
            <Switch defaultChecked onChange={onSlashingChecked} />
          </Box>
          {slashingProtectionIncluded ? (
            <div>
              <Typography>Upload your slashing protection file to protect your keystore(s).</Typography>
              <Typography variant="body2" color="GrayText" sx={{ marginBottom: 4 }}>
                <i>only for previously-used keystores</i>
              </Typography>
              <FileDrop callback={slashingFilesCallback} />
              {slashingFile ? (
                <Card key={slashingFile.name} raised sx={{ padding: 2, marginTop: 4, width: "80%" }}>
                  <Typography variant="h6">
                    <b>✅ {slashingFile.name}</b>
                    <br />
                  </Typography>
                </Card>
              ) : null}
            </div>
          ) : null}
        </Card>

        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "row-reverse",
            alignContent: "end",
            alignItems: "end",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            size="large"
            endIcon={<BackupIcon />}
            disabled={acceptedFiles.length === 0}
            onClick={async () => {
              setKeystoresPostResponse(undefined);
              handleClickOpen();
              const results = await web3signerApi.importKeystores({
                keystores: acceptedFiles.map((f) => f.file),
                passwords,
                slashingProtection: slashingFile,
              });
              setKeystoresPostResponse(results);
            }}
          >
            Submit Keystores
          </Button>
          <Link to={{ pathname: "/", search: window.location.search }}>
            <Button variant="outlined" size="large" color="warning" sx={{ marginRight: 4 }}>
              Back to Accounts
            </Button>
          </Link>
        </Box>
      </Box>
      {dialog}
    </div>
  );
}
