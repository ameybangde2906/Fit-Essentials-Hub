import mongoose from 'mongoose';

const productSchema =mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },
        productBrand: {
            type: String,
            required: true
        },
        productWeight: {
            type: String,
            required: true
        },
        productCategory: {
            type: String,
            required: true
        },
        productType: {
            type: String,
            required: true
        },
        productCost: {
            type: Number,
            required: true
        },
        productDiscount: {
            type: String,
        },
        productDescription: {
            type: String,
            required: true
        },
        productFeature: {
            type: String,
        },
        productImage: {
            type: String,
            required: true
        },
    },
    {
        timestamps:true
    }
);

export default mongoose.model("product",productSchema);