//Internal components
import Message from "../Messages/Message";
import KeystoreList from "../../KeystoreList";
import KeystoresDeleteDialog from "../../KeystoresDeleteDialog";

//External components
import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { GridSelectionModel } from "@mui/x-data-grid";

//Logic
import { Web3SignerApi } from "../../web3signerApi";
import { Web3signerGetResponse } from "../../web3signerApi/types";
import { useEffect, useState } from "react";

//Icons
import BackupIcon from "@mui/icons-material/Backup";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

//Styles
import { boxStyle } from "../../Styles/ListStyles";

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
          <Typography variant="h5">
            <b>Your Validator Accounts</b>
          </Typography>

          {loading ? (
            <CircularProgress
              sx={{
                marginBottom: 4,
              }}
            />
          ) : keystoresGet?.error ? (
            <Typography variant="h5" color="error">
              Error: {keystoresGet.error.message}
            </Typography>
          ) : keystoresGet?.data ? (
            <>
              <KeystoreList
                rows={keystoresGet.data}
                setSelectedRows={setSelectedRows}
                network={network}
              />
              <Box
                sx={{
                  marginTop: 4,
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignContent: "end",
                  alignItems: "end",
                  width: "100%",
                }}
              >
                <Link
                  to={{ pathname: "/import", search: window.location.search }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<BackupIcon />}
                  >
                    Import Keystores
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  disabled={selectedRows.length === 0}
                  sx={{ marginRight: 4 }}
                  endIcon={<DeleteForeverIcon />}
                  onClick={() => setOpen(true)}
                >
                  Delete Keystores
                </Button>
              </Box>
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
