//Internal components
import FileDrop from "./components/FileDrop/FileDrop";
import { SecondaryInfoTypography } from "./Styles/Typographies";

//External components
import {
  Box,
  Button,
  Card,
  Switch,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

//React
import { Link } from "react-router-dom";
import { DropEvent } from "react-dropzone";
import { useState } from "react";

//Icons
import BackupIcon from "@mui/icons-material/Backup";

//Logic
import { setUniquePassword } from "./logic/ImportScreen/PasswordManager";
import { extractPubkey } from "./logic/Utils/dataUtils";
import { ImportStatus, KeystoreInfo } from "./types";
import { Web3SignerApi } from "./apis/web3signerApi";
import { Web3signerPostResponse } from "./apis/web3signerApi/types";
import FileCardList from "./components/FileCards/FileCardList";
import ImportDialog from "./components/Dialogs/ImportDialog";
import {
  importButtonBoxStyle,
  mainImportBoxStyle,
  slashingProtectionBoxStyle,
} from "./Styles/dialogStyles";

export default function ImportScreen({
  web3signerApi,
}: {
  web3signerApi: Web3SignerApi;
}) {
  const [keystoresPostResponse, setKeystoresPostResponse] =
    useState<Web3signerPostResponse>();
  const [openDialog, setOpenDialog] = useState(false);
  const [acceptedFiles, setAcceptedFiles] = useState<KeystoreInfo[]>([]);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [importStatus, setImportStatus] = useState(ImportStatus.NotImported);

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

  //USE SAME PASSWORD SWITCH
  const [useSamePassword, setUseSamePassword] = useState(false); //Same password for all keystores
  const handleUseSamePasswordSwitch = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setUseSamePassword(checked);
    const emptyPasswords = Array.from(passwords);
    emptyPasswords.fill("");
    setPasswords(emptyPasswords);
  };

  // SLASHING PROTECTION SWITCH
  const [slashingProtectionIncluded, setSlashingProtectionIncluded] =
    useState(true);
  const onSlashingChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setSlashingProtectionIncluded(checked);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <div>
      <Box sx={mainImportBoxStyle}>
        <Card
          sx={{
            padding: 4,
            borderRadius: 3,
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

          <SecondaryInfoTypography
            sx={{ marginBottom: 4 }}
            text="Keystores files are usually named keystore-xxxxxxxx.json and were
                created in the Ethereum launchpad deposit CLI. Do not upload the
                deposit_data.json file."
          />
          <FileDrop callback={keystoreFilesCallback} />

          <SecondaryInfoTypography
            sx={{ marginBottom: 2, marginTop: 4 }}
            text="Remember you need to introduce the password you set during
                creation of the keystore files."
          />

          {acceptedFiles.length > 0 && (
            <>
              <FormGroup sx={{ marginTop: "6px" }}>
                <FormControlLabel
                  control={<Switch onChange={handleUseSamePasswordSwitch} />}
                  label="Use same password for every file"
                />
              </FormGroup>
              {useSamePassword && (
                <TextField
                  id="outlined-password-input"
                  label="Keystores Password"
                  type="password"
                  onChange={(event) =>
                    setUniquePassword(event, passwords, setPasswords)
                  }
                  sx={{ marginTop: 2, width: "60%" }}
                />
              )}
            </>
          )}

          {FileCardList(
            acceptedFiles,
            setAcceptedFiles,
            passwords,
            setPasswords,
            useSamePassword
          )}

          <Box sx={slashingProtectionBoxStyle}>
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              <b>Import slashing protection data? (recommended)</b>
            </Typography>
            <Switch defaultChecked onChange={onSlashingChecked} />
          </Box>
          {slashingProtectionIncluded ? (
            <div>
              <Typography>
                Upload your slashing protection file to protect your
                keystore(s).
              </Typography>

              <SecondaryInfoTypography
                sx={{ marginBottom: 4 }}
                text="Only for previously-used keystores"
              />
              <FileDrop callback={slashingFilesCallback} />
              {slashingFile ? (
                <Card
                  key={slashingFile.name}
                  raised
                  sx={{
                    padding: 2,
                    marginTop: 4,
                    width: "80%",
                    borderRadius: 3,
                  }}
                >
                  <Typography variant="h6">
                    <b>✅ {slashingFile.name}</b>
                    <br />
                  </Typography>
                </Card>
              ) : null}
            </div>
          ) : null}
        </Card>

        <Box sx={importButtonBoxStyle}>
          <Button
            variant="contained"
            size="large"
            endIcon={<BackupIcon />}
            disabled={acceptedFiles.length === 0}
            onClick={async () => {
              setKeystoresPostResponse(undefined);
              setImportStatus(ImportStatus.Importing);
              handleClickOpenDialog();
              const results = await web3signerApi.importKeystores({
                keystores: acceptedFiles.map((f) => f.file),
                passwords,
                slashingProtection: slashingFile,
              });

              setKeystoresPostResponse(results);

              if (results?.data) {
                setImportStatus(ImportStatus.Imported);
              } else {
                setImportStatus(ImportStatus.NotImported);
              }
            }}
            sx={{ borderRadius: 3 }}
          >
            Submit Keystores
          </Button>
          <Link to={{ pathname: "/", search: window.location.search }}>
            <Button
              variant="outlined"
              size="large"
              color="warning"
              sx={{ marginRight: 4, borderRadius: 3 }}
            >
              Back to Accounts
            </Button>
          </Link>
        </Box>
      </Box>
      <ImportDialog
        open={openDialog}
        setOpen={setOpenDialog}
        keystoresPostResponse={keystoresPostResponse}
        importStatus={importStatus}
        acceptedFiles={acceptedFiles}
      />
    </div>
  );
}
