import express from "express";
import cors from "cors";
require("isomorphic-fetch");

import ValidatorClientRequester from "./services/ValidatorClientRequester";
import { validatorClientApiMap } from "./params";
import { isEthAddress, isValidatorPK } from "./utils/utils";

const app = express();
const port = 3001;

app.use(
  cors({
    methods: ["GET", "POST"],
    origin: "http://localhost:3000", //TODO - change to env variable
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/feerecipient", async (req, res) => {
  console.log("GET /feerecipient");

  const client = req.query.client as string;
  const validatorPublicKey = req.query.validatorPublicKey as string;

  if (client === undefined || validatorPublicKey === undefined) {
    res
      .status(400)
      .send("Bad Request. Missing consensus client or validator public key.");
  } else if (!validatorClientApiMap.has(client)) {
    res.status(400).send("Bad Request. Invalid consensus client.");
  } else if (!isValidatorPK(validatorPublicKey)) {
    res.status(400).send("Bad Request. Invalid validator public key.");
  } else {
    const clientApiParams = validatorClientApiMap.get(client);

    if (clientApiParams === undefined) {
      res.status(500).send("Internal Server Error.");
    } else {
      const validatorApi = new ValidatorClientRequester(clientApiParams);

      const feeRecipientGet = await validatorApi.getFeeRecipient(
        validatorPublicKey
      );

      res.send(feeRecipientGet);
    }
  }
});

app.post("/feerecipient", async (req, res) => {
  console.log("POST /feerecipient");

  const client = req.query.client as string;
  const validatorPublicKey = req.query.validatorPublicKey as string;
  const newFeeRecipient = req.body?.ethaddress as string;

  if (
    client === undefined ||
    validatorPublicKey === undefined ||
    newFeeRecipient === undefined
  ) {
    res
      .status(400)
      .send(
        "Bad Request. Missing consensus client, validator public key or new fee recipient."
      );
  } else if (!validatorClientApiMap.has(client)) {
    res.status(400).send("Bad Request. Invalid consensus client.");
  } else if (!isValidatorPK(validatorPublicKey)) {
    res.status(400).send("Bad Request. Invalid validator public key.");
  } else if (!isEthAddress(newFeeRecipient)) {
    res.status(400).send("Bad Request. Invalid new fee recipient address.");
  } else {
    const clientApiParams = validatorClientApiMap.get(client);

    if (clientApiParams === undefined) {
      res.status(500).send("Internal Server Error.");
    } else {
      const validatorApi = new ValidatorClientRequester(clientApiParams);

      await validatorApi
        .setFeeRecipient(newFeeRecipient, validatorPublicKey)
        .catch((error) => {
          res.status(500).send(error);
        });

      //TODO: Perform GET to check if address has been set?

      res.send("Fee recipient set successfully.");
    }
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
