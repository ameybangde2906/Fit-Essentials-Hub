import wishlist from "../../models/wishlist model/wishlist.js";

export const addTowishlist= async (req, res, next)=> {
    const newProduct = new wishlist({
        productName:req.body.productName,
        productBrand:req.body.productBrand,
        productCost:req.body.productCost,
        productDiscount:req.body.productDiscount,
        productCategory: req.body.productCategory,
        productType: req.body.productType,
        productImage: req.body.productImage,
        productDescription:req.body. productDescription,
        productWeight: req.body.productWeight,
        quantity:req.body.quantity,
        userId:req.body.userId,
        productId:req.body.productId,
    });
    await newProduct.save();
    return res.status(200).json("Product added Successfully!");
}

export const wishListById = async (req, res, next) => {
    try {
        const userId = await wishlist.find({
            userId: { $regex: '^' + req.params.key }
        });
        res.json(userId)
        // if(!userId)
        // return next(404,"No userId found")
    } catch (error) {
        return next(500, "internal server error")
    }
}

export const wishlistByuserIdandproductId = async (req, res, next) => {
    try {
        const product = await wishlist.find({
            $and: [
                { productId: { $regex: '^' + req.params.id } },
                { userId: { $regex: '^' + req.params.key } }
            ]
        })
        res.json(product)
    } catch (error) {
        return next(500, "internal server error");
    }
}

export const wishlistDeleteproduct = async (req, res, next) => {
    try {
        const role = await wishlist.deleteOne({
            $and: [
                { productId: { $regex: '^' + req.params.id } },
                { userId: { $regex: '^' + req.params.key } }
            ]
        })
        res.json("product deleted from wishlist")
    } catch (error) {
        return res.status(500).json("internal server error")
    }
}