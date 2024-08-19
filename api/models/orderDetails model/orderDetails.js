import mongoose from 'mongoose';

const detailSchema = mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true
        },
        customerAddress: {
            type: String,
            required: true
        },
        orderCost: {
            type: Number,
            required: true
        },
        paymentMode: {
            type: String,
        },
        userId: {
            type: String,
            required: true
        },
        products: {}
    },
    {
        timestamps: true
    }

)

export default mongoose.model("orderDetail", detailSchema)
