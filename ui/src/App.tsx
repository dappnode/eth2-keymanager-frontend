//External components
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";

//Internal components
import TopBar from "./components/TopBar/TopBar";
import ImportScreen from "./ImportScreen";
import ListScreen from "./ListScreen";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

//Styles
import "./App.css";

//Themes
import { darkTheme } from "./Themes/darkTheme";

//Logic
import { getUrlParams } from "./getUrlParams";
import { Web3SignerApi } from "./web3signerApi";

//Other libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";

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
          <>
            <ErrorMessage message="The API is not available. Please, check the URL and try again." />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
