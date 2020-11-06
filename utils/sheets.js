const { google } = require("googleapis");

const secret = require("../client-secret.json");

const client = new google.auth.JWT(
  secret.client_email,
  null,
  secret.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const gsrum = async (client, parameters) => {
  const gsapi = google.sheets({ version: "v4", auth: client });
  const opt = {
    spreadsheetId: "1_qC9wgS0erqaOy-YOZMcbN4WseMX4BLqWmeEoMp-xJU",
    range: parameters,
  };
  const data = await gsapi.spreadsheets.values.get(opt);
  return data.data.values;
};

const readData = async (parameters) => {
  const data = await gsrum(client, parameters);
  return data;
};

module.exports = { readData };
