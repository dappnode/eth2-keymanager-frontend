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

//Styles
import { boxStyle } from "../../Styles/listStyles";
import HeaderTypography from "../../Styles/Typographies";

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

  const [keystoresGet, setKeystoresGet] = useState<Web3signerGetResponse>();

  useEffect(() => {
    async function getKeystores() {
      setLoading(true);
      const keystoresGet = await web3signerApi.getKeystores();
      setLoading(false);
      setKeystoresGet(keystoresGet);
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
