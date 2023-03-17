const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

const factureRouter = require("./routes/facture");

app.use(cors());
app.use(bodyParser.json());

app.use("/api", factureRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
