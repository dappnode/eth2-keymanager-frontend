import express from "express";
const app = express();
const port = 3001;

app.get("/feerecipient", (req, res) => {
  //TODO: Get fee recipient from validator client
  res.send("TODO");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
