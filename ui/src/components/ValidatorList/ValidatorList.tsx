//Internal components
import Message from "../Messages/Message";
import KeystoreList from "../../KeystoreList";
import KeystoresDeleteDialog from "../../KeystoresDeleteDialog";
import ButtonsBox from "../ButtonsBox/ButtonsBox";

//External components
import { Box, Card, CircularProgress } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";

//Logic
import { Web3SignerApi } from "../../apis/web3signerApi";
import { Web3signerGetResponse } from "../../apis/web3signerApi/types";
import { useEffect, useState } from "react";
import { BeaconchaApi } from "../../apis/beaconchaApi";
import buildValidatorSummaryURL from "../../apis/beaconchaApi/buildValidatorSummaryURL";
import { availableNetworks, beaconchaApiParamsMap } from "../../params";

//Styles
import { boxStyle } from "../../Styles/listStyles";
import { HeaderTypography } from "../../Styles/Typographies";

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
        <Card sx={{ padding: 4 }}>
          <HeaderTypography text="Your validator accounts" />

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
