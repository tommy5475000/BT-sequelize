import express from "express";
import { addOrder, getLikeRestaurant, getLikeRestaurantByUser, getRateRes, getRateResByUser,  likeRes, rateRes } from "../controllers/resController.js";

const resRoute = express.Router();

resRoute.get("/like-res/:resId", getLikeRestaurant)
resRoute.get("/like-res-by-user/:userId", getLikeRestaurantByUser)
resRoute.post("/like/:userId", likeRes)
resRoute.post("/rate/:userId", rateRes)
resRoute.get("/rate-res/:resId", getRateRes)
resRoute.get("/rate-res-by-user/:userId", getRateResByUser)
resRoute.post("/add-order/:userId", addOrder)

export default resRoute;
