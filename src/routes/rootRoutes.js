import express from "express";
import resRoute from "./resRoutes.js";

const rootRoute = express.Router();

rootRoute.use("/res", resRoute);

export default rootRoute;
