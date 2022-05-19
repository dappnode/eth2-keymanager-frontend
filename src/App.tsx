import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImportScreen from "./ImportScreen";
import ListScreen from "./ListScreen";
import React, { useEffect } from "react";
import { getNetwork } from "./network";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4872b5",
    },
    background: {
      default: "#0a0a0a",
      paper: "#121212",
    },
  },
});

function toolbar({ network }: { network: string }): JSX.Element {
  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
        ETH2 Key Manager ({network} chain)
      </Typography>
    </Toolbar>
  );
}

function App() {
  const [network, setNetwork] = React.useState("");

  useEffect(() => {
    setNetwork(getNetwork());
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary">
        {toolbar({ network })}
      </AppBar>
      <Container component="main" maxWidth="lg">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListScreen network={network} />} />
            <Route path="import" element={<ImportScreen network={network} />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
