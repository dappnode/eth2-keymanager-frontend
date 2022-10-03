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
  validatorClientApiMap,
} from "../../params";

//Styles
import { boxStyle } from "../../Styles/listStyles";
import { HeaderTypography } from "../../Styles/Typographies";
import { ValidatorApi } from "../../apis/validatorApi";

async function tmp() {
  const validatorApi = new ValidatorApi(
    validatorClientApiMap.get("lighthouse-prater")!
  );
  console.log(
    await validatorApi.getFeeRecipient(
      "0x902cdec4b92680c16b555a279cd20e3871186e28ab2270e7e8b27d99cd6c338f025b1cae4881b231a87654844e5c9e0f"
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
            <Message message={keystoresGet.error.message} severity="error" />
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
            <Message severity="warning" message="No keystores found" />
          )}
        </Card>
      </Box>
    </div>
  );
}
