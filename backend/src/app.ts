import express, { json, static as static_, urlencoded } from "express";
import cors from "cors";

import router from "./routes";
import {
  globalErrorHandler,
  notFoundErrorHandler,
} from "./middlewares/error-handlers";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(static_("public"));
app.use(router);
app.use(notFoundErrorHandler);
app.use(globalErrorHandler);

app.listen(8008, () => {
  console.log("Server started at PORT: 8008");
});
