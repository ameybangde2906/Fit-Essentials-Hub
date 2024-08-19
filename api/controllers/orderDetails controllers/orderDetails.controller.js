import orderDetail from "../../models/orderDetails model/orderDetails.js";

export const orders =async (req, res, next )=>{
    const orderData = new orderDetail({
        customerName:req.body.customerName,
        customerAddress:req.body.customerAddress,
        orderCost: req.body.orderCost,
        paymentMode:req.body.paymentMode,
        userId:req.body.userId,
        products:req.body.products
    });
    await orderData.save();
    return res.status(200).json("delivery data success");
}

export const getOrders = async (req, res, next) => {
    try {
        const userId = await orderDetail.find({
            userId: { $regex: '^' + req.params.key}
        })
        res.json(userId)
        if (!userId)
            return next(404, "No userId found")
    } catch (error) {
        return next(500, "internal server error")
    }
}

export const bestSellers = async (req, res, next) => {
    try {
        const bestSellers = await orderDetail.aggregate([
            {
                $unwind: "$products"
            },
            {
                $match: {
                    "products.productCategory": req.params.key // Filter by productCategory
                }
            },
            {
                $group: {
                    _id: "$products.productId",
                    productName: { $first: "$products.productName" },
                    productBrand: { $first: "$products.productBrand" },
                    productCategory:{$first: "$products.productCategory"},
                    productType:{$first: "$products.productType"},
                    productId: { $first: "$products.productId" },
                    productCost: { $first: "$products.productCost" },
                    productDiscount: {$first:"$products.productDiscount"},
                    productImage: { $first: "$products.productImage" },
                    quantity: { $sum: "$products.quantity" }
                }
            },
            { $sort: { quantity: -1 } },
            { $limit: 100 }
        ]);
        return res.status(200).json(bestSellers);
    } catch (error) {
        return next(error); // Pass the error object to the next middleware
    }
};

export const bestSellersAll = async (req, res, next) => {
    try {
        const bestSellers = await orderDetail.aggregate([
            {
                $unwind: "$products"
            },
            {
                $group: {
                    _id: "$products.productId",
                    productName: { $first: "$products.productName" },
                    productBrand: { $first: "$products.productBrand" },
                    productCategory:{$first: "$products.productCategory"},
                    productType:{$first: "$products.productType"},
                    productId: { $first: "$products.productId" },
                    productCost: { $first: "$products.productCost" },
                    productDiscount: {$first:"$products.productDiscount"},
                    productImage: { $first: "$products.productImage" },
                    quantity: { $sum: "$products.quantity" }
                }
            },
            { $sort: { quantity: -1 } },
            { $limit: 100 }
        ]);
        return res.status(200).json(bestSellers);
    } catch (error) {
        return next(error); // Pass the error object to the next middleware
    }
};
