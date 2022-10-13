//Internal components
import KeystoreList from "../KeystoreList/KeystoreList";
import KeystoresDeleteDialog from "../Dialogs/KeystoresDeleteDialog";
import EditFeesDialog from "../Dialogs/EditFeesDialog";
import ButtonsBox from "../ButtonsBox/ButtonsBox";

//External components
import { Alert, Box, Card, CircularProgress } from "@mui/material";
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
  const [openDelete, setOpenDelete] = useState(false);
  const [openEditFees, setOpenEditFees] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validatorSummaryURL, setValidatorSummaryURL] = useState<string>("");
  const [hasBeaconchaError, setHasBeaconchaError] = useState(false);
  const [keystoresGet, setKeystoresGet] = useState<Web3signerGetResponse>();

  async function getKeystores() {
    setLoading(true);
    const keystoresGet = await web3signerApi.getKeystores();
    setKeystoresGet(keystoresGet);
    setLoading(false);
  }

  async function getValidatorSummaryURL(beaconchaApi: BeaconchaApi) {
    if (!keystoresGet) {
      setValidatorSummaryURL("");
      return;
    }

    const allValidatorsInfo = await beaconchaApi.fetchAllValidatorsInfo({
      keystoresGet: keystoresGet,
    });

    const hasError = allValidatorsInfo.some(
      (validatorInfo) => validatorInfo.status === "error"
    );
    if (hasError) {
      setHasBeaconchaError(true);
      setValidatorSummaryURL("");
      return;
    }

    try {
      const validatorSummaryURL = buildValidatorSummaryURL({
        allValidatorsInfo,
        network,
      });
      setValidatorSummaryURL(validatorSummaryURL);
      setHasBeaconchaError(false);
    } catch (e) {
      setValidatorSummaryURL("");
      console.log(e);
    }
  }

  useEffect(() => {
    if (!openDelete) {
      getKeystores();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDelete]);

  useEffect(() => {
    if (
      keystoresGet &&
      network != null &&
      availableNetworks.includes(network)
    ) {
      const beaconchaParams = beaconchaApiParamsMap.get(network);

      if (beaconchaParams) {
        const beaconchaApi = new BeaconchaApi(beaconchaParams);
        getValidatorSummaryURL(beaconchaApi);
      }
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
          {loading ? (
            <CircularProgress
              sx={{
                marginBottom: 4,
              }}
            />
          ) : keystoresGet?.error ? (
            <Alert severity="error" sx={{ marginTop: 2 }} variant="filled">
              {keystoresGet.error?.message}
            </Alert>
          ) : keystoresGet?.data ? (
            <>
              <KeystoreList
                rows={keystoresGet.data}
                setSelectedRows={setSelectedRows}
                network={network}
              />
              <ButtonsBox
                isTableEmpty={selectedRows.length === 0}
                setDeleteOpen={setOpenDelete}
                setOpenEditFees={setOpenEditFees}
                validatorSummaryURL={validatorSummaryURL}
                hasBeaconchaError={hasBeaconchaError}
              />
              <KeystoresDeleteDialog
                web3signerApi={web3signerApi}
                rows={keystoresGet.data}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                open={openDelete}
                setOpen={setOpenDelete}
              />
              <EditFeesDialog
                network={network}
                rows={keystoresGet.data}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                open={openEditFees}
                setOpen={setOpenEditFees}
              />
              {hasBeaconchaError && (
                <Alert
                  severity="warning"
                  sx={{ marginTop: 2 }}
                  variant="filled"
                >
                  There was an error loading the dashboard. The number of API
                  calls allowed by the explorer might have been exceeded. Please
                  wait for a minute and refresh the page.
                </Alert>
              )}

            </>
          ) : (
            <Alert severity="warning" sx={{ marginTop: 2 }} variant="filled">
              There are no keystores to display.
            </Alert>
          )}
        </Card>
      </Box>
    </div>
  );
}
