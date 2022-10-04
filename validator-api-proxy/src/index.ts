import express from "express";
import cors from "cors";
require("isomorphic-fetch");

import ValidatorClientRequester from "./services/ValidatorClientRequester";
import { validatorClientApiMap } from "./params";

const app = express();
const port = 3001;

app.use(
  cors({
    methods: ["GET", "POST"],
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/feerecipient", async (req, res) => {
  //TODO: Handle params not existing

  const client = req.query.client as string;
  const validatorPublicKey = req.query.validatorPublicKey as string;

  if (client === undefined || validatorPublicKey === undefined) {
    res
      .status(400)
      .send("Bad Request. Missing consensus client or validator public key.");
  } else if (!validatorClientApiMap.has(client)) {
    res.status(400).send("Bad Request. Invalid consensus client.");
  } else {
    const validatorApi = new ValidatorClientRequester(
      validatorClientApiMap.get(client)!
    );

    //TODO Perform validator public key checks

    const feeRecipientGetOld = await validatorApi.getFeeRecipient(
      validatorPublicKey
    );

    res.send(feeRecipientGetOld);
  }
});

app.post("/feerecipient", async (req, res) => {
  //TODO: Handle params not existing

  const client = req.query.client as string;
  const validatorPublicKey = req.query.validatorPublicKey as string;
  const newFeeRecipient = req.body?.ethaddress as string;

  if (client === undefined || validatorPublicKey === undefined) {
    res
      .status(400)
      .send("Bad Request. Missing consensus client or validator public key.");
  } else if (!validatorClientApiMap.has(client)) {
    res.status(400).send("Bad Request. Invalid consensus client.");
  } else if (req.body.ethaddress === undefined) {
    res.status(400).send("Bad Request. Missing fee recipient eth address.");
  } else {
    const validatorApi = new ValidatorClientRequester(
      validatorClientApiMap.get(client)!
    );

    //TODO Perform validator public key checks

    await validatorApi
      .setFeeRecipient(newFeeRecipient, validatorPublicKey)
      .catch((error) => {
        res.status(500).send(error);
      });

    //TODO: Perform GET to check if address has been set?

    res.send("Fee recipient set successfully.");
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
