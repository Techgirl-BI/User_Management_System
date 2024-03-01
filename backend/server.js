import express from 'express'
import httpStatus from "http-status";
import morgan from "morgan"
import colors from "colors"
import cors from 'cors'
import {dbConnect} from "../backend/config/dbConnect.js"
import { workerRoute } from './routes/workerRoute.js';
import dotenv from "dotenv";
dotenv.config({});

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use("/worker", workerRoute)
app.get("/", (req, res) => {
    try {
      res
        .status(httpStatus.OK)
        .json({
          status: "Success",
          message: "Welcome Our User Management System",
        });
    } catch (error) {
      console.log(error.message);
      res.status(httpStatus[404]).send(error.message);
    }
  });
  app.all("*", (req, res) => {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      payload: "endpoint not defined",
    });
  });

 
  dbConnect()
  .then(() => {
    console.log("connected to Database".bgGreen);

    const port = process.env.NODE_ENV === "development" ? process.env.PORT : 7000;

    app.listen(port, () =>{
      console.log(
        `app is running on port ${port} in ${process.env.NODE_ENV} mode`.bgGreen
      );
    });
  })
  .catch((err) => console.log(`dbError:${err}`.bgRed));
