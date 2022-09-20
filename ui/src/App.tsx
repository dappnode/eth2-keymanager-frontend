//External components
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container } from "@mui/material";

//Internal components
import TopBar from "./components/TopBar/TopBar";
import ImportScreen from "./ImportScreen";
import ListScreen from "./ListScreen";

//Styles
import "./App.css";

//Other libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  const [network, setNetwork] = React.useState("");
  const [web3signerApi, setWeb3signerApi] =
    React.useState<Web3SignerApi | null>(null);

  useEffect(() => {
    const { network, authToken, host, baseUrl } = getUrlParams();
    setNetwork(network);
    if (baseUrl) setWeb3signerApi(new Web3SignerApi(baseUrl, authToken, host));
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <TopBar network={network} />
      <Container component="main" maxWidth="lg">
        {web3signerApi ? (
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <ListScreen web3signerApi={web3signerApi} network={network} />
                }
              />
              <Route
                path="import"
                element={<ImportScreen web3signerApi={web3signerApi} />}
              />
            </Routes>
          </BrowserRouter>
        ) : (
          // show a beautiful error message if the API is not available
          <Typography variant="h5" color="error">
            Error: API is not available
          </Typography>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
