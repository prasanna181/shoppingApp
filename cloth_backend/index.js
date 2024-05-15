// require('dotenv').config()

import express from "express";
import connection from "./database/db.js";
import Router from "./Routes/Routes.js";
import bodyParser from "body-parser";
import cors from "cors";

import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", Router);
// app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("server is started at port no." + port));

connection();
