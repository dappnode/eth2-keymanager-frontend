//Internal components
import Message from "../Messages/Message";
import KeystoreList from "../../KeystoreList";
import KeystoresDeleteDialog from "../../KeystoresDeleteDialog";
import ButtonsBox from "../ButtonsBox/ButtonsBox";

//External components
import { Box, Card, CircularProgress } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";

//Logic
import { Web3SignerApi } from "../../logic/web3signerApi";
import { Web3signerGetResponse } from "../../logic/web3signerApi/types";
import { useEffect, useState } from "react";

//Styles
import { boxStyle } from "../../Styles/listStyles";
import HeaderTypography from "../../Styles/Typographies";
import { BeaconchaGetResponse } from "../../logic/beaconchaApi/types";
import { BeaconchaApi } from "../../logic/beaconchaApi";
import getAllValidatorIndexes from "../../logic/beaconchaApi/getAllValidatorIndexes";

export default function ValidatorList({
  web3signerApi,
  beaconchaApi,
  network,
}: {
  web3signerApi: Web3SignerApi;
  beaconchaApi: BeaconchaApi;
  network: string;
}) {
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [keystoresGet, setKeystoresGet] = useState<Web3signerGetResponse>();
  const [validatorIndexes, setValidatorIndexes] =
    useState<BeaconchaGetResponse>();

  useEffect(() => {
    async function getKeystores() {
      setLoading(true);
      //const keystoresGet = await web3signerApi.getKeystores();
      /*const allValidatorPKs = keystoresGet.data.map(
        (keystoreDataItem) => keystoreDataItem.validating_pubkey
      );*/ //TODO uncomment this
      const allValidatorPKs = [
        "0x80000001677f23a227dfed6f61b132d114be83b8ad0aa5f3c5d1d77e6ee0bf5f73b0af750cc34e8f2dae73c21dc36f4a",
        "0x800006d4b1026b6149168b342e6883d48ede9539202cc414448b1b796394440a5401e8d6620e65d7c77654bf1db199b1",
      ]; //TODO Remove this
      const validatorIndexes = await getAllValidatorIndexes({
        beaconchaApi,
        allValidatorPKs,
      });

      console.log("Validator indexes", validatorIndexes);

      //setKeystoresGet(keystoresGet);
      setLoading(false);
    }
    if (!open) {
      getKeystores();
    }
  }, [open, web3signerApi]);

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
