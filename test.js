const { google } = require("googleapis");

const secret = require("./client-secret.json");

const client = new google.auth.JWT(
  secret.client_email,
  null,
  secret.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const gsrum = async (client) => {
  const gsapi = google.sheets({ version: "v4", auth: client });
  const opt = {
    spreadsheetId: "1_qC9wgS0erqaOy-YOZMcbN4WseMX4BLqWmeEoMp-xJU",
    range: "Filtered Products!A2:E2009",
  };

  const data = await gsapi.spreadsheets.values.get(opt);
  return data.data.values;
};

const readData = () => {
  return client.authorize(async (err, tokens) => {
    if (err) {
      console.log(err);
    }
    console.log("connected!");
    console.log(await gsrum(client));
    return { ...gsrum(client) };
  });
};

readData();
