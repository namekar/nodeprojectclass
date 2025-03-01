const JSRSASign = require("jsrsasign");

const GenerateJWT = (header, claims, key) => {
  const sHeader = JSON.stringify(header);
  const sPayload = JSON.stringify(claims);
  return JSRSASign.jws.JWS.sign("HS512", sHeader, sPayload, key);
};

const DecodeJWT = (sJWS) => {
  const aJWT = sJWS.split(".");
  const uHeader = JSRSASign.b64utos(aJWT[0]);
  const uClaim = JSRSASign.b64utos(aJWT[1]);
  return JSRSASign.jws.JWS.readSafeJSONString(uClaim);
};

const ValidateJWT = (header, token, key) => {
  return JSRSASign.jws.JWS.verifyJWT(token, key, { alg: [header.alg] });
};

module.exports = { GenerateJWT, DecodeJWT, ValidateJWT };