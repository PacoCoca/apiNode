import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.APP_PORT,
  authKey: process.env.AUTH_KEY,
};