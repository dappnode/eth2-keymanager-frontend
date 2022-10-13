import express from "express";
import cors from "cors";
require("isomorphic-fetch");

import ValidatorClientRequester from "./services/ValidatorClientRequester";
import { validatorClientApiNetworkMap, keyManagerUiUrl } from "./params";
import RequestChecker from "./RequestChecker";
import { AllowedRequestTypes } from "./types";

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

  const clientApiParams = validatorClientApiNetworkMap.get(network).get(client);

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

  res.send("Fee recipient set successfully.");
});

app.listen(port, () => {
  return console.log(
    `Validator proxy server is listening at http://localhost:${port}`
  );
});
