import cors from "cors";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { errorHandler } from "./middlewares";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(routes);

app.use(errorHandler);

export default (): express.Application => {
  return app;
};
