import cors from "cors";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import path from "path";
import { errorHandler } from "./middlewares";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(routes);

app.use(errorHandler);

export default (): express.Application => {
  return app;
};
