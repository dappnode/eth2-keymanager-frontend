import './App.css';
import { Box, Button } from '@mui/material';
import KeystoreList from './KeystoreList';
import { Link } from "react-router-dom";

export default function ListScreen() {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          marginBottom: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          width: '100%'
        }}
      >
        <Link to="/import"><Button variant="contained" size='large'>Import Keystores</Button></Link>
      </Box>

      <KeystoreList />
    </Box>
  );
}

