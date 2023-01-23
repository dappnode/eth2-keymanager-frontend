//External components
import { Card, Box, Typography, TextField } from "@mui/material";

//Internal components
import { KeystoreInfo } from "../../types";

//Logic
import CloseIcon from "@mui/icons-material/Close";
import { passwordEntered } from "../../logic/ImportScreen/PasswordManager";
import { shortenPubkey } from "../../logic/Utils/dataUtils";

//Style
import "./FileCardList.css";

const removeFileFromList = (
  fileInfo: KeystoreInfo,
  fileInfos: KeystoreInfo[],
  setAcceptedFiles: (passwords: KeystoreInfo[]) => void,
  passwords: string[],
  setPasswords: (passwords: string[]) => void
) => {
  var indexToRemove = fileInfos.indexOf(fileInfo);
  setAcceptedFiles(fileInfos.filter((f, index) => index !== indexToRemove));
  setPasswords(passwords.filter((f, index) => index !== indexToRemove));
};

export default function FileCardList(
  fileInfos: KeystoreInfo[],
  setAcceptedFiles: (passwords: KeystoreInfo[]) => void,
  passwords: string[],
  setPasswords: (passwords: string[]) => void,
  useSamePassword: boolean
): JSX.Element[] {
  return Array.from(fileInfos).map((fileInfo, index) => (
    <Card
      key={index}
      raised
      sx={{ padding: 2, marginTop: 4, width: "80%", borderRadius: 3 }}
    >
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
        <button
          onClick={() =>
            removeFileFromList(
              fileInfo,
              fileInfos,
              setAcceptedFiles,
              passwords,
              setPasswords
            )
          }
        >
          <CloseIcon color="action" />
        </button>
      </Box>
      {!useSamePassword && (
        <TextField
          id={`outlined-password-input-${index}`}
          label="Keystore Password"
          type="password"
          onChange={(event) =>
            passwordEntered(event, index, passwords, setPasswords)
          }
          sx={{ marginTop: 2, width: "60%" }}
        />
      )}
    </Card>
  ));
}
