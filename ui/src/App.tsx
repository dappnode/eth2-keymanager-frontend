//External components
import { ThemeProvider } from "@mui/material/styles";
import { Container, Alert } from "@mui/material";

//Internal components
import TopBar from "./components/TopBar/TopBar";
import ImportScreen from "./ImportScreen";
import ValidatorList from "./components/ValidatorList/ValidatorList";
import { consensusClient, executionClient } from "./params";

//Themes
import { darkTheme } from "./Themes/globalThemes";

//Logic
import { getUrlParams } from "./logic/Utils/getUrlParams";
import { Web3SignerApi } from "./apis/web3signerApi";

//Other libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import ClientsBox from "./components/ClientsBox/ClientsBox";

function App() {
  const [network, setNetwork] = React.useState("");
  const [web3signerApi, setWeb3signerApi] =
    React.useState<Web3SignerApi | null>(null);
  const [signerStatus, setSignerStatus] = React.useState("loading");

  useEffect(() => {
    const { network, authToken, host, signerUrl } = getUrlParams();
    setNetwork(network);
    if (signerUrl) {
      setWeb3signerApi(
        new Web3SignerApi({
          baseUrl: signerUrl,
          authToken: authToken,
          host: host,
        })
      );
    }
  }, []);

  //Status check for web3signer
  const getSignerStatus = async () => {
    setSignerStatus((await web3signerApi?.getStatus())?.status || "loading...");
  };

  useEffect(() => {
    getSignerStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3signerApi]);

  return (
    <ThemeProvider theme={darkTheme}>
      <TopBar network={network} signerStatus={signerStatus} />
      <Container component="main" maxWidth="xl">
        {web3signerApi && network ? (
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <ValidatorList
                      web3signerApi={web3signerApi}
                      network={network}
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
            <Alert severity="error" sx={{ marginTop: 2 }} variant="filled">
              The network is not properly defined or the Web3Signer API is not
              available. Please, check the URL or the env variables and try
              again.
            </Alert>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
