import express from 'express';
import { bestSellers, bestSellersAll, getOrders, orders } from '../../controllers/orderDetails controllers/orderDetails.controller.js';

const router= express.Router();

router.get("/orders/:key", getOrders)
router.get('/bestsellers/:key',bestSellers)
router.get('/bestsellersall',bestSellersAll)

router.post("/order-data", orders)

export default router