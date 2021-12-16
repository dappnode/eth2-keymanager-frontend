import './App.css';
import { Box, Button, Card, Switch, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { DropEvent } from 'react-dropzone'
import { useState } from 'react';
import FileDrop from './FileDrop';
import BackupIcon from '@mui/icons-material/Backup';
import CloseIcon from '@mui/icons-material/Close';

export type KeystoreInfo = {
  file: File,
  password: string
}

export default function ImportScreen() {

  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const keystoreFilesCallback = (files: File[], event: DropEvent) => {
    if (acceptedFiles.some(e => e.name === files[0].name) === false) {
      setAcceptedFiles([...acceptedFiles].concat([files[0]]));
    }
  }

  const [slashingFile, setSlashingFile] = useState<File>();
  const slashingFilesCallback = (files: File[], event: DropEvent) => {
    setSlashingFile(files[0]);
  }

  const files = acceptedFiles ? Array.from(acceptedFiles).map(file => (
    <Card key={file.name} raised sx={{ padding: 2, marginTop: 4, width: '80%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'left'
        }}
      >
        <Typography variant='h6' sx={{ flex: 1 }}><b>✅ {file.name}</b></Typography>
        <a onClick={() => setAcceptedFiles(acceptedFiles.filter(f => f.name != file.name))}><CloseIcon /></a>
      </Box>
      <TextField
        id={`outlined-password-input-${file.name}`}
        label="Keystore Password"
        type="password"
        sx={{ marginTop: 2, width: '60%' }}
      />
    </Card>
  )) : [];

  return (
    <Box
      sx={{
        margin: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
      }}
    >
      <Card sx={{
        padding: 4
      }}>
        <Typography variant='h5' sx={{
          marginBottom: 4
        }}><b>Import Validator Keystore(s)</b></Typography>
        <Typography >
          Upload any keystore JSON file(s).</Typography>
        <Typography variant='body2' sx={{ marginBottom: 4 }} color='GrayText'>
          <i>Keystores files are usually named keystore-xxxxxxxx.json and were created in the Ethereum launchpad deposit CLI.
            Do not upload the deposit_data.json file.<br /></i>
        </Typography>
        <FileDrop callback={keystoreFilesCallback} />

        {files}

        <Box
          sx={{
            marginTop: 8,
            marginBottom: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'left',
          }}
        >
          <Typography variant='h5' sx={{ marginRight: 2 }}><b>Import slashing protection data? (recommended)</b></Typography>
          <Switch defaultChecked />
        </Box>
        <Typography>Upload your slashing protection file to protect your keystore(s).</Typography>
        <Typography variant='body2' color='GrayText' sx={{ marginBottom: 4 }}><i>only for previously-used keystores</i></Typography>
        <FileDrop callback={slashingFilesCallback} />
        {slashingFile ? (
          <Card key={slashingFile.name} raised sx={{ padding: 2, marginTop: 4, width: '80%' }}>
            <Typography variant='h6'><b>✅ {slashingFile.name}</b><br /></Typography>
          </Card>
        ) : null}
      </Card>

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
        <Button variant="contained" size='large' endIcon={<BackupIcon />} disabled={acceptedFiles.length == 0}>Submit Keystores</Button>
        <Link to="/"><Button variant="outlined" size='large' color='warning' sx={{ marginRight: 4 }} >Back to Accounts</Button></Link>
      </Box>
    </Box>
  );
}

