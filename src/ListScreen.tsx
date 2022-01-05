import './App.css';
import { Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import KeystoreList from './KeystoreList';
import { Link } from "react-router-dom";
import { GridSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import BackupIcon from '@mui/icons-material/Backup';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteKeystores, shortenPubkey, useListFetcher, Response, getEmoji, base_url } from './DataStore';

export default function ListScreen() {

  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Response>();
  const [requestInFlight, setRequestInFlight] = useState(false);
  const rows = useListFetcher(!open);

  const handleClickOpen = () => {
    setOpen(true);
    setResults(undefined);
    setRequestInFlight(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteSelectedKeystores = async () => {
    setResults(undefined);
    setRequestInFlight(true);
    const deleteResults = await deleteKeystores(selectedRows.map(row => rows[parseInt(row.toString())].pubkey));
    setRequestInFlight(false);
    setResults(deleteResults);
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
        {results ? "Done" : "Delete Keystores?"}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          {results?.error ? `Error: ${results.error.message}` :
            results?.data ? (
              <div>
                {results.data.map((result, index) => (
                  <div style={{ marginBottom: '20px' }}>
                    <Typography variant='h5' color='GrayText'>{shortenPubkey(rows[index]?.pubkey)}</Typography>
                    <Typography variant='h6'><b>Status:</b> {result.status} {getEmoji(result.status)}</Typography>
                    {result.message ? <Typography variant='h6'><b>Message:</b> {result.message}</Typography> : null}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {
                  requestInFlight ? (
                    <Box
                      sx={{
                        margin: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <CircularProgress sx={{
                        marginBottom: 4,
                      }} />
                      <DialogContentText id="alert-dialog-description">
                        Please wait
                      </DialogContentText>
                    </Box>
                  ) :
                    (<DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete these keystores?
                      <ul>
                        {selectedRows.map((row) => (
                          <li>{shortenPubkey(rows[parseInt(row.toString())].pubkey)}</li>
                        ))}
                      </ul>
                      After deletion, these keystores won't be used for signing anymore and your slashing protection data will be downloaded. <br /><br />
                      <b>Keep the slashing protection data for when you want to import these keystores to a new validator.</b>
                    </DialogContentText>
                    )}
              </div>
            )}
        </Box>
      </DialogContent>
      <DialogActions>
        {!results && !requestInFlight ? <Button onClick={() => deleteSelectedKeystores()} variant="contained" sx={{ marginRight: 1 }}>Confirm</Button> : null}
        <Button onClick={handleClose} variant="outlined">Close</Button>
      </DialogActions>
    </Dialog >
  )
  return (
    <div>
      <Box
        sx={{
          margin: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Card sx={{ padding: 4 }}>
          <Typography variant='h5' ><b>Your Validator Accounts List</b></Typography>
          <Typography color='GrayText' sx={{ marginBottom: 4 }}>{base_url ? `Signer URL: ${base_url}` : "⚠️ No value passed for signer_url"}</Typography>
          <KeystoreList rows={rows} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'row-reverse',
              alignContent: 'end',
              alignItems: 'end',
              width: '100%'
            }}
          >
            <Link to="/import"><Button variant="contained" size='large' endIcon={<BackupIcon />}>Import Keystores</Button></Link>
            <Button variant='contained' size='large' color='error'
              disabled={selectedRows.length == 0}
              sx={{ marginRight: 4 }}
              endIcon={<DeleteForeverIcon />}
              onClick={handleClickOpen}>Delete Keystores</Button>
          </Box>
        </Card>
      </Box>
      {dialog}
    </div>
  );
}

