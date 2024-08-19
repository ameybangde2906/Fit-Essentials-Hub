import express from "express";
import { addToCart, decrementProduct, deleteById, deleteCartProducts, getById, incrementProduct } from "../../controllers/cart controllers/cart.controller.js";

const router = express.Router();


router.post("/addtocart",addToCart);

router.get("/userid/:key",getById);

router.delete("/deleteid/:key",deleteById);

router.put("/increment/:id",incrementProduct)

router.put("/decrement/:id",decrementProduct)

router.delete("/deleteallcart/:key",deleteCartProducts)


export default router;
