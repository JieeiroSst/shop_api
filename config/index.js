require("dotenv").config();
const { google } = require("googleapis");

const oauth2 = google.oauth2("v2");

const scopes = ["https://www.googleapis.com/auth/drive"];

const createConnection = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT
  );
};
