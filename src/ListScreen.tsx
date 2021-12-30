import './App.css';
import { Box, Button, Card, Typography } from '@mui/material';
import KeystoreList from './KeystoreList';
import { Link } from "react-router-dom";
import { GridSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import BackupIcon from '@mui/icons-material/Backup';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ListScreen() {
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
  return (
    <Box
      sx={{
        margin: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
      }}
    >
      <Card sx={{ padding: 4 }}>
        <Typography variant='h5' sx={{ marginBottom: 4 }}><b>Your Validator Accounts List</b></Typography>
        <KeystoreList selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
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
          <Button variant='contained' size='large' color='error' disabled={selectedRows.length == 0} sx={{ marginRight: 4 }} endIcon={<DeleteForeverIcon />}>Delete Keystores</Button>
        </Box>
      </Card>
    </Box>
  );
}

