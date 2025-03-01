const express = require("express");
const { GenerateJWT, DecodeJWT, ValidateJWT } = require("./dec-enc");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3100;

app.get("/", (req, res) => res.send("Welcome to the JWT API!"));

app.post("/api/GenerateJWT", (req, res) => {
  res.json(GenerateJWT(req.body.header, req.body.claims, req.body.key));
});

app.post("/api/DecodeJWT", (req, res) => {
  res.json(DecodeJWT(req.body.sJWS));
});

app.post("/api/ValidateJWT", (req, res) => {
  res.json(ValidateJWT(req.body.header, req.body.token, req.body.key));
});

app.listen(port, () => console.log(`Server running on port ${port}!`));