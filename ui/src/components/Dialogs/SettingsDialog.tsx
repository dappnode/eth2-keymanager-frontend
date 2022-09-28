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

export default function SettingsDialog({
  isDialogOpen,
  setIsDialogOpen,
  selectedPubkey,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedPubkey: string;
}): JSX.Element {
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const availableSettings = ["Change validator fee recipient"];

  return (
    <Dialog
      disableEscapeKeyDown={true}
      open={isDialogOpen}
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
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 700 }}>
        <Settings sx={{ marginRight: 2 }} />
        Validator Settings
      </DialogTitle>
      <DialogContent>
        <List sx={{ pt: 0 }}>
          {availableSettings.map((setting) => (
            <ListItemButton onClick={() => console.log("test")} key={setting}>
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
        <Button onClick={handleClose} variant="contained" sx={{ margin: 2 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
