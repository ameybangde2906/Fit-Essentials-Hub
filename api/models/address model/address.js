import mongoose from 'mongoose';

const addressSchema=mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required: true,
        },
        phone:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        town:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required: true,
        },
        pincode:{
            type:Number,
            required:true,
        },
        userId:{
            type:String,
        },
        deliverAt:{
            type:String,
            required:true,
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model("addressdetail", addressSchema)