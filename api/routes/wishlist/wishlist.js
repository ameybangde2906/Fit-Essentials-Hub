import express from "express";
import { addTowishlist, wishListById, wishlistByuserIdandproductId, wishlistDeleteproduct } from "../../controllers/wishlist controllers/wishlist.controller.js";

const router = express.Router();

router.get("/userid/:id/:key",wishlistByuserIdandproductId);
router.get("/wishlistbyuserid/:key",wishListById);

router.post("/addtowishlist",addTowishlist);

router.delete("/wishlistProductdelete/:id/:key",wishlistDeleteproduct)


export default router;
