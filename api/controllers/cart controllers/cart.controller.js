import cart from "../../models/cart model/cart.js";

export const addToCart= async (req, res, next)=> {
    const newProduct = new cart({
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

export const getById = async (req, res, next) => {
    try {
        const userId = await cart.find({
            userId: { $regex: '^' + req.params.key }
        });
        res.json(userId)
        // if(!userId)
        // return next(404,"No userId found")
    } catch (error) {
        return next(500, "internal server error")
    }
}

export const deleteById = async (req, res, next) => {
    try {
        const roleId = req.params.key;
        const role = await cart.findById({ _id: roleId })
        if (role) {
            await cart.findByIdAndDelete(roleId);
            return res.json("id deleted");
        } else {
            return res.status(404).json("role not found!")
        }
    } catch (error) {
        return res.status(500).json("internal server error!")
    }
}

export const incrementProduct = async (req, res, next) => {
    try {
        const role = await cart.findById({ _id: req.params.id });
        if (!role) {
            return res.status(404).json("Product not found")
        }

        {
            role.quantity++;
            await role.save();
            res.json(role);
        }
    } catch (error) {
        return res.status(500).json('Internal server error!');
    }

}

export const decrementProduct = async (req, res, next) => {
    try {
        const role = await cart.findById({ _id: req.params.id });
        if (!role) {
            return res.status(404).json("Product not found")
        }
        if (role.quantity > 1) {
            role.quantity--;
            await role.save();
            res.json(role);
        }
        else {

        }
    } catch (error) {
        return res.status(500).json('Internal server error!');
    }
}

export const deleteCartProducts=async(req,res,next)=>{
    try {
        const userId=req.params.key
        const user=await cart.find({userId:userId});
        if (user) {
            await cart.deleteMany({userId})
            return res.json("product deleted");
        } else {
            return res.status(404).json("role not found!")
        }   
      } catch (error) {
        return res.status(500).json("internal server error")
    }
}