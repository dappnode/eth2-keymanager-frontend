//External components
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";

//Internal components
import TopBar from "./components/TopBar/TopBar";
import ImportScreen from "./ImportScreen";
import ValidatorList from "./components/ValidatorList/ValidatorList";
import Message from "./components/Messages/Message";

//Styles
import "./App.css";

//Themes
import { darkTheme } from "./Themes/globalThemes";

//Logic
import { getUrlParams } from "./getUrlParams";
import { Web3SignerApi } from "./logic/web3signerApi";
import { BeaconchaApi } from "./logic/beaconchaApi";
import { beaconchaApiParamsMap, availableNetworks } from "./params";

//Other
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";

function App() {
  const [network, setNetwork] = React.useState("");
  const [web3signerApi, setWeb3signerApi] =
    React.useState<Web3SignerApi | null>(null);
  const [beaconchaApi, setBeaconchaApi] = React.useState<BeaconchaApi | null>(
    null
  );

  useEffect(() => {
    const { network, authToken, host, baseUrl } = getUrlParams();
    //setNetwork(network);TODO: uncomment this and remove hardcoded network
    setNetwork("mainnet");
    if (baseUrl) setWeb3signerApi(new Web3SignerApi(baseUrl, authToken, host));
    if (beaconchaApiParamsMap.has("mainnet")) {
      setBeaconchaApi(new BeaconchaApi(beaconchaApiParamsMap.get("mainnet")!));
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <TopBar network={network} />
      <Container component="main" maxWidth="xl">
        {web3signerApi && availableNetworks.includes(network) ? (
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <ValidatorList
                    beaconchaApi={beaconchaApi!} //TODO this is not safe (why does it work for w3signer?)
                    web3signerApi={web3signerApi}
                    network={network}
                  />
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
            <Message
              message="The API is not available or the network is wrong. Please, check the URL and try again."
              severity="error"
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
