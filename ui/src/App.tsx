//External components
import { ThemeProvider } from "@mui/material/styles";
import { Container, Alert } from "@mui/material";

//Internal components
import TopBar from "./components/TopBar/TopBar";
import ImportScreen from "./ImportScreen";
import ValidatorList from "./components/ValidatorList/ValidatorList";
import ClientsBox from "./components/ClientsBox/ClientsBox";

//Themes
import { darkTheme } from "./Themes/globalThemes";

//Logic
import { getParams } from "./logic/Utils/getParams";
import { Web3SignerApi } from "./apis/web3signerApi";
import { Web3SignerStatus } from "./types";

//Other libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";

function App() {
  const [currentNetwork, setCurrentNetwork] = React.useState("");
  const [web3signerApi, setWeb3signerApi] =
    React.useState<Web3SignerApi | null>(null);
  const [signerStatus, setSignerStatus] =
    React.useState<Web3SignerStatus>("LOADING");

  const {
    network,
    signerAuthToken,
    signerUrl,
    consensusClient,
    executionClient,
  } = getParams();

  useEffect(() => {
    setCurrentNetwork(network);
    if (signerUrl) {
      setWeb3signerApi(
        new Web3SignerApi({
          baseUrl: signerUrl,
          authToken: signerAuthToken,
        })
      );
    } else {
      setSignerStatus("ERROR");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showSignerStatus = async () => {
    if (web3signerApi) {
      const status = (await web3signerApi.getStatus())?.status;
      setSignerStatus(status || "ERROR");
    }
  };

  useEffect(() => {
    showSignerStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3signerApi]);

  return (
    <ThemeProvider theme={darkTheme}>
      <TopBar network={currentNetwork} signerStatus={signerStatus} />
      <Container component="main" maxWidth="xl">
        {web3signerApi && signerStatus === "UP" && currentNetwork ? (
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <ValidatorList
                      web3signerApi={web3signerApi}
                      network={currentNetwork}
                    />
                    {consensusClient && executionClient && (
                      <ClientsBox
                        consensusClient={consensusClient
                          .split(".")[0]
                          ?.toUpperCase()}
                        executionClient={executionClient
                          .split(".")[0]
                          ?.toUpperCase()}
                      />
                    )}
                  </>
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
            {signerStatus === "ERROR" ? (
              <Alert severity="error" sx={{ marginTop: 2 }} variant="filled">
                Web3Signer API is not available. Check URL or global variables.
                Is the Web3Signer API running?
              </Alert>
            ) : (
              signerStatus === "DOWN" && (
                <Alert severity="error" sx={{ marginTop: 2 }} variant="filled">
                  Web3Signer is down.
                </Alert>
              )
            )}
            {!currentNetwork && (
              <Alert severity="error" sx={{ marginTop: 2 }} variant="filled">
                Network has not been properly set. Check URL or global
                variables.
              </Alert>
            )}
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
