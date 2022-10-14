import express from "express";
import cors from "cors";
import path from "path";

import ValidatorClientRequester from "./services/ValidatorClientRequester";
import { validatorClientApiNetworkMap, keyManagerUiUrl } from "./params";
import RequestChecker from "./RequestChecker";
import { AllowedRequestTypes } from "./types";
import FeeRecipientSaver from "./FeeRecipientSaver";

require("isomorphic-fetch");

const app = express();
const port = 3001;

app.use(
  cors({
    methods: ["GET", "POST"],
    origin: keyManagerUiUrl,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../", "build")));
app.use(express.static("public"));

app.get("/feerecipient", async (req, res) => {
  console.log("GET /feerecipient");

  const client = req.query.client as string;
  const validatorPublicKey = req.query.validatorPublicKey as string;
  const network = req.query.network as string;

  const reqChecker = new RequestChecker(req, res);
  if (!reqChecker.isFeeRecipientReqOk(AllowedRequestTypes.GET)) {
    res.status(400).end();
    return;
  }

  const clientApiParams = validatorClientApiNetworkMap
    .get(network)
    ?.get(client);

  if (clientApiParams === undefined) {
    res.status(500).send("Internal Server Error.");
  } else {
    const validatorApi = new ValidatorClientRequester(clientApiParams);

    const feeRecipientGet = await validatorApi.getFeeRecipient(
      validatorPublicKey
    );

    res.send(feeRecipientGet);
  }
});

app.post("/feerecipient", async (req, res) => {
  console.log("POST /feerecipient");

  const client = req.query.client as string;
  const validatorPublicKey = req.query.validatorPublicKey as string;
  const newFeeRecipient = req.body?.ethaddress as string;
  const network = req.query.network as string;

  const reqChecker = new RequestChecker(req, res);
  if (!reqChecker.isFeeRecipientReqOk(AllowedRequestTypes.POST)) {
    res.status(400).end();
    return;
  }

  const clientApiParams = validatorClientApiNetworkMap
    .get(network)
    ?.get(client);

  if (clientApiParams === undefined) {
    res.status(500).end();
    return;
  }

  const validatorApi = new ValidatorClientRequester(clientApiParams);

  await validatorApi
    .setFeeRecipient(newFeeRecipient, validatorPublicKey)
    .catch((error) => {
      res.status(500).send(error);
    });

  //TODO: Perform GET to check if address has been set?

  const feeRecipientSaver = new FeeRecipientSaver();
  feeRecipientSaver.appendFeeRecipientsToFile(network, client, [
    { pubkey: validatorPublicKey, feeRecipient: newFeeRecipient },
  ]);

  res.send("Fee recipient set successfully.");
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../../", "build", "index.html"));
});

app.listen(port, () => {
  return console.log(
    `KeyManager UI is being served at http://localhost:${port}`
  );
});
