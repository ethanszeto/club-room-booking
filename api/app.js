import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

/**
 * This file controls the express server and
 * lets the server use everything it needs to
 * in order to function.
 */

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/public", express.static(process.cwd() + "/public"));

//app.use("/", router);

export default app;
