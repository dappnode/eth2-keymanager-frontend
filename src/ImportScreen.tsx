import './App.css';
import { Box, Button, Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { DropEvent } from 'react-dropzone'
import { useState } from 'react';
import FileDrop from './FileDrop';

export default function ImportScreen() {

  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const keystoreFilesCallback = (files: File[], event: DropEvent) => {
    if(acceptedFiles.some(e => e.name === files[0].name) === false) {
      setAcceptedFiles([...acceptedFiles].concat([files[0]]));
    }
  }

  const files = acceptedFiles ? Array.from(acceptedFiles).map(file => (
    <li key={file.name}>
      {file.name}
    </li>
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
        <Typography variant='h4' sx={{
          marginBottom: 4
        }}><b>Import Validator Keystore(s)</b></Typography>
        <Typography sx={{
          marginBottom: 4
        }}>
          Upload any keystore JSON file(s).<br />
          <i>Keystores files are usually named keystore-xxxxxxxx.json and were created in the Ethereum launchpad deposit CLI.
            Do not upload the deposit_data.json file.<br /></i>
          You can drag and drop the directory or individual files.<br />
        </Typography>
        <FileDrop callback={keystoreFilesCallback}/>

        <Typography variant='h6' sx={{marginTop: 4}}>Selected Files:</Typography>
        <ul>
          {files}
        </ul>

      </Card>

      <Link to="/"><Button variant="text" size='large'>Back</Button></Link>
    </Box>
  );
}

