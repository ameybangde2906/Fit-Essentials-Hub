import mongoose from 'mongoose';

const cartSchema =mongoose.Schema(
    {
        productName:{
           type: String,
        },
        productBrand:{
            type:String
        },
        productCost:{
            type: String,
        },
        productDiscount:{
            type: String,
        },
        productCategory:{
            type: String,
        },
        productType:{
            type: String,
        },
        productImage:{
            type: String,
        },
        productDescription:{
            type: String,
        },
        productWeight:{
            type: String,
        },
        quantity:{
            type: Number,
        },
        userId:{
            type: String,
        },
        productId:{
            type: String,
        },
        
    },
    {
        timestamps: true
    }
);

export default mongoose.model("cart",cartSchema);