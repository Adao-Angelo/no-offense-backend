import express, { Request, Response } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(errorHandler);

export default (): express.Application => {
  return app;
};
