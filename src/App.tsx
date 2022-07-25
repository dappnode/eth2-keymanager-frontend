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
import { getUrlParams } from "./getUrlParams";
import { Web3SignerApi } from "./web3signerApi";

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

function toolbar({ network }: { network?: string }): JSX.Element {
  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
        ETH2 Key Manager {network ? `(${network})` : ""}
      </Typography>
    </Toolbar>
  );
}

function App() {
  const [network, setNetwork] = React.useState("");
  const [authToken, setAuthToken] = React.useState("");
  const [host, setHost] = React.useState("");
  const [baseUrl, setBaseUrl] = React.useState("");
  const [web3signerApi, setWeb3signerApi] = React.useState<Web3SignerApi | null>(null);

  useEffect(() => {
    const { network, authToken, host, baseUrl } = getUrlParams();
    setNetwork(network);
    setAuthToken(authToken);
    setHost(host);
    setBaseUrl(baseUrl);

    setWeb3signerApi(new Web3SignerApi(host, baseUrl, authToken));
  }, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary">
        {toolbar({ network })}
      </AppBar>
      <Container component="main" maxWidth="lg">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListScreen web3signerApi={web3signerApi} />} />
            <Route path="import" element={<ImportScreen web3signerApi={web3signerApi} />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
