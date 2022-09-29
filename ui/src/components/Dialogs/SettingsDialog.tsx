import { Settings } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { SlideTransition } from "./Transitions";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import FeeRecipientDialog from "./FeeRecipientDialog";

export default function SettingsDialog({
  isDialogOpen,
  setIsDialogOpen,
  selectedPubkey,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedPubkey: string;
}): JSX.Element {
  const closeSettingsDialog = () => {
    setIsDialogOpen(false);
  };

  const availableSettings = ["Change validator fee recipient"];
  const [isFeeDialogOpen, setIsFeeDialogOpen] = useState(false);

  return (
    <Dialog
      disableEscapeKeyDown={true}
      open={isDialogOpen}
      fullWidth={true}
      onClose={(event, reason) => {
        if (!reason) {
          closeSettingsDialog();
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
        <div>
          <Settings sx={{ marginRight: 2 }} />
          Validator Settings
        </div>
      </DialogTitle>
      <DialogContent>
        <FeeRecipientDialog
          open={isFeeDialogOpen}
          setOpen={setIsFeeDialogOpen}
          selectedValidatorPubkey={selectedPubkey}
          newFeeRecipient={"TODO"}
        />

        <List sx={{ pt: 0 }}>
          {availableSettings.map((setting) => (
            <ListItemButton
              onClick={() => setIsFeeDialogOpen(true)}
              key={setting}
              sx={{ borderRadius: 3 }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <CurrencyExchangeOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={setting} />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={closeSettingsDialog}
          variant="contained"
          sx={{ marginRight: 2, marginBottom: 2, borderRadius: 3 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
