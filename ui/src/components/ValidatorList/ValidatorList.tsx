//Internal components
import Message from "../Messages/Message";
import KeystoreList from "../KeystoreList/KeystoreList";
import KeystoresDeleteDialog from "../Dialogs/KeystoresDeleteDialog";
import ButtonsBox from "../ButtonsBox/ButtonsBox";

//External components
import { Box, Button, Card, CircularProgress } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";

//Logic
import { Web3SignerApi } from "../../apis/web3signerApi";
import { Web3signerGetResponse } from "../../apis/web3signerApi/types";
import { useEffect, useState } from "react";
import { BeaconchaApi } from "../../apis/beaconchaApi";
import buildValidatorSummaryURL from "../../apis/beaconchaApi/buildValidatorSummaryURL";
import {
  availableNetworks,
  beaconchaApiParamsMap,
  validatorApiProxyUrl,
  validatorClientApiMap,
} from "../../params";

//Styles
import { boxStyle } from "../../Styles/listStyles";
import { HeaderTypography } from "../../Styles/Typographies";
import { ValidatorApi } from "../../apis/validatorApi";

async function tmp() {
  const validatorApi = new ValidatorApi(
    validatorClientApiMap.get("prysm-prater")!,
    validatorApiProxyUrl
  );

  await validatorApi.setFeeRecipient(
    "0x0000000000000000000000000000000000000002",
    "0x85abea8fb2f90371875e8ff4dadac8b5308662c2d40533d8d74c13544a2f315183e404181f4cfa65ce7b3a435b709d2f"
  );

  console.log(
    await validatorApi.getFeeRecipient(
      "0x85abea8fb2f90371875e8ff4dadac8b5308662c2d40533d8d74c13544a2f315183e404181f4cfa65ce7b3a435b709d2f"
    )
  );
}

export default function ValidatorList({
  web3signerApi,
  network,
}: {
  web3signerApi: Web3SignerApi;
  network: string;
}) {
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validatorSummaryURL, setValidatorSummaryURL] = useState<string>("");

  const [keystoresGet, setKeystoresGet] = useState<Web3signerGetResponse>();

  async function getKeystores() {
    setLoading(true);
    const keystoresGet = await web3signerApi.getKeystores();
    setKeystoresGet(keystoresGet);
    setLoading(false);
  }

  async function getValidatorSummaryURL(beaconchaApi: BeaconchaApi) {
    const allValidatorsInfo = await beaconchaApi.fetchAllValidatorsInfo({
      beaconchaApi: beaconchaApi,
      keystoresGet: keystoresGet!,
    });

    const hasError = allValidatorsInfo.some((item) => item.status === "error");

    if (hasError) {
      setValidatorSummaryURL("");
    } else {
      try {
        const validatorSummaryURL = buildValidatorSummaryURL({
          allValidatorsInfo,
          network,
        });
        setValidatorSummaryURL(validatorSummaryURL);
      } catch (e) {
        setValidatorSummaryURL("");
        console.log(e);
      }
    }
  }

  useEffect(() => {
    if (!open) {
      getKeystores();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (
      keystoresGet &&
      network != null &&
      availableNetworks.includes(network)
    ) {
      const beaconchaApi = new BeaconchaApi(
        beaconchaApiParamsMap.get(network)! //TODO Be careful with this !
      );

      getValidatorSummaryURL(beaconchaApi);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keystoresGet]);

  return (
    <div>
      <Box className="box" sx={boxStyle}>
        <Card sx={{ padding: 4, borderRadius: 5 }}>
          <HeaderTypography
            sx={{ flexGrow: 1, fontWeight: "bold", marginBottom: 2 }}
            text="Your validator accounts"
          />

          <Button onClick={() => tmp()}>Get fee recipient</Button>

          {loading ? (
            <CircularProgress
              sx={{
                marginBottom: 4,
              }}
            />
          ) : keystoresGet?.error ? (
            <Message
              message={keystoresGet.error.message}
              severity="error"
              sx={{ marginTop: "2em" }}
            />
          ) : keystoresGet?.data ? (
            <>
              <KeystoreList
                rows={keystoresGet.data}
                setSelectedRows={setSelectedRows}
                network={network}
              />
              <ButtonsBox
                isTableEmpty={selectedRows.length === 0}
                setOpen={setOpen}
                validatorSummaryURL={validatorSummaryURL}
              />
              {open && (
                <KeystoresDeleteDialog
                  web3signerApi={web3signerApi}
                  rows={keystoresGet.data}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                  open={open}
                  setOpen={setOpen}
                />
              )}
            </>
          ) : (
            <Message
              severity="warning"
              message="No keystores found"
              sx={{ marginTop: "2em" }}
            />
          )}
        </Card>
      </Box>
    </div>
  );
}
