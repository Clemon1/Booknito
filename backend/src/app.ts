import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { dbConnect } from "./db/dbConnect";
import cors from "cors";
import authRouter from "./router/authRouter";
import bookingRouter from "./router/bookingRoutes";
import roomRouter from "./router/roomsRouter";
import analysisRouter from "./router/analysisRoute";
import path from "path";
dotenv.config();
const app: Express = express();
dbConnect(`${process.env.DB_URL}`);

//Middlewares
// app.use(express.static("src/uploads"));
app.use("/src/uploads", express.static("src/uploads"));

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  }),
);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Ts world");
});

app.use("/auth", authRouter);
app.use("/v1/rooms", roomRouter);
app.use("/v1/booking", bookingRouter);
app.use("/v1/analysis", analysisRouter);

app.listen(4000, (): void =>
  console.log("Booknito App listening on port 4000"),
);
