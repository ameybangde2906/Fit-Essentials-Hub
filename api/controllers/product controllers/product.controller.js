import product from "../../models/products model/product.js";
import { CreateError } from "../../utils/error.js";
import { CreateSuccess } from "../../utils/success.js";

export const addProduct = async (req, res, next)=> {
    const newProduct = new product({
        productName:req.body.productName,
        productBrand:req.body.productBrand,
        productWeight:req.body.productWeight,
        productCategory:req.body.productCategory,
        productType:req.body.productType,
        productCost:req.body.productCost,
        productDiscount:req.body.productDiscount,
        productDescription :req.body.productDescription,
        productFeature :req.body.productFeature,
        productImage: req.body.productImage
    });
    await newProduct.save();
    return res.status(200).json("Product added Successfully!");
}

export const getAllproducts = async (req, res, next) => {
    try {
        const products = await product.find();
        res.json(products);
    } catch (error) {
        return next(500, "internal server error");
    }
}

export const getAllproduct = async (req, res, next) => {
    try {
        const searchKey = new RegExp(req.params.key, 'i'); // Create case-insensitive regular expression
        
        const products = await product.find({
            "$or": [
                { productName: { $regex: searchKey } },
                { productCategory: { $regex: searchKey } },
                { productBrand: { $regex: searchKey } },
                { productType: { $regex: searchKey } },
            ]
        });
        if(products){
            res.json(products);
        }
    } catch (error) {
        return next(500, "internal server error");
    }
}

export const getbyId = async (req, res, next) => {
    try {
        const products = await product.findById(req.params.id);
        res.json(products);
    } catch (error) {
        return next(500, "internal server error");
    }
}

export const createProduct = async (req, res, next) => {
    try {
        if (req.body.productName && req.body.productName !== '') {
            const newProduct = new product(req.body);
            await newProduct.save();
            return next(CreateSuccess(200, "product created!"))
        } else {
            return next(CreateError(400, "bad request"));
        }
    } catch (error) {
        return next(CreateError(500, "internal server error"));
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const role = await product.findById({ _id: req.params.id });
        if (role) {
            const newData = await product.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            return res.status(200).json("Product updated")

        } else {
            return res.status(404).json("role not found...")
        }
    } catch (error) {
        return res.status(500).json('Internal server error!');
    }

}


export const deleteProducts = async (req, res, next) => {
    try {
        const roleId = req.params.id;
        const role = await product.findById({ _id: roleId })
        if (role) {
            await product.findByIdAndDelete(roleId);
            return res.status(200).json("product deleted");
        } else {
            return res.status(404).json("role not found!")
        }
    } catch (error) {
        return res.status(500).json("internal server error!")
    }
}

export const getsuppDiscount=async(req,res,next)=>{
    try {
        const products=await product.find({
            "productCategory":req.params.key,
            "productDiscount":{$gte:"30"}
        }).sort({ "productDiscount": -1 })
        res.json(products)
    } catch (error) {
        return next(500, "internal server error");
    }
}
export const getsuppTypeDiscount=async(req,res,next)=>{
    try {
        const products=await product.find({
            "productCategory":"Supplements",
            "productType":req.params.key,
            "productDiscount":{$gte:"30" }
        }).sort({ "productDiscount": -1 })
        res.json(products)
    } catch (error) {
        return next(500, "internal server error");
    }
}
export const getaccTypeDiscount=async(req,res,next)=>{
    try {
        const products=await product.find({
            "productCategory":"Accessories",
            "productType":req.params.key,
            "productDiscount":{$gte:"10" }
        }).sort({ "productDiscount": -1 })
        res.json(products)
    } catch (error) {
        return next(500, "internal server error");
    }
}

export const getrelatedProducts = async (req, res, next) => {
    try {
        const productId= req.params.id;
        const products = await product.find({ "productType": req.params.key, "_id": { "$ne": productId }});
        res.json(products);
    } catch (error) {
        return next(500, "internal server error");
    }
}
export const getProductsByType = async (req, res, next) => {
    try {
        const products = await product.find({ "productType": req.params.key });
        res.json(products);
    } catch (error) {
        return next(500, "internal server error");
    }
}
export const getProductsByBrand = async (req, res, next) => {
    try {
        const products = await product.find({ "productBrand": req.params.key });
        res.json(products);
    } catch (error) {
        return next(500, "internal server error");
    }
}
export const getProductsByCategory = async (req, res, next) => {
    try {
        const products = await product.find({ "productCategory": req.params.key });
        res.json(products);
    } catch (error) {
        return next(500, "internal server error");
    }
}