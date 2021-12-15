import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImportScreen from './ImportScreen';
import ListScreen from './ListScreen';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#285295',
    },
    background: {
      default: '#000000',
      paper: '#090909',
    }
  },
});

function toolbar(): JSX.Element {
  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
        ETH2 Key Manager
      </Typography>
    </Toolbar>
  );
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary">
        {toolbar()}
      </AppBar>
      <Container component="main" maxWidth="lg">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListScreen />} />
            <Route path="import" element={<ImportScreen />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
