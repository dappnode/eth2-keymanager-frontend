//External components
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";

//Internal components
import TopBar from "./components/TopBar/TopBar";
import ImportScreen from "./ImportScreen";
import ValidatorList from "./components/ValidatorList/ValidatorList";
import Message from "./components/Messages/Message";

//Themes
import { darkTheme } from "./Themes/globalThemes";

//Logic
import { getUrlParams } from "./logic/Utils/getUrlParams";
import { Web3SignerApi } from "./apis/web3signerApi";

//Other libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { ApiParams } from "./types";

function App() {
  const [network, setNetwork] = React.useState("");
  const [web3signerApi, setWeb3signerApi] =
    React.useState<Web3SignerApi | null>(null);

  useEffect(() => {
    const { network, authToken, host, baseUrl } = getUrlParams();
    setNetwork(network);
    if (baseUrl)
      setWeb3signerApi(
        new Web3SignerApi({
          baseUrl: baseUrl,
          authToken: authToken,
          host: host,
        } as ApiParams)
      );
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <TopBar network={network} />
      <Container component="main" maxWidth="xl">
        {web3signerApi ? (
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <ValidatorList
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
              message="The API is not available. Please, check the URL and try again."
              severity="error"
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
