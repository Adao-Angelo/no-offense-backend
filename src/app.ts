import express, { Request, Response } from "express";
import "express-async-errors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandler);

export default (): express.Application => {
  return app;
};
