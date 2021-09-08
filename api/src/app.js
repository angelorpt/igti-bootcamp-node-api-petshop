import express, { application } from "express";
import cors from "cors";
import routes from "../routes";
import configureLog from "./log";

require("dotenv").config();
const app = express();
configureLog();

app.use(cors());
app.use(express.json());
routes(app);

app.listen(process.env.PORT, () => console.log("API Running"));

export default app;
