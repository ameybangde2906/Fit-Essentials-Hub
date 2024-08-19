import addressdetail from "../../models/address model/address.js";

export const addressDetails=async (req, res, next )=>{
    const orderData = new addressDetail({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone,
        email:req.body.email,
        address:req.body.address,
        town:req.body.town,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        pincode: req.body.pincode,
        userId:req.body.userId,
        deliverAt:req.body.deliverAt
    });
    await orderData.save();
    return res.status(200).json("delivery data success");
}

export const getAddress = async (req, res, next) => {
    try {
        const userId = await addressdetail.find({
            userId: { $regex: '^' + req.params.key }
        });
        res.json(userId)
        if (!userId)
            return next(404, "No userId found")
    } catch (error) {
        return next(500, "internal server error")
    }
}

export const getAddressById=async (req, res, next)=>{
    try{
        const addressId=await addressdetail.findById({_id:req.params.id})
        if(addressId){
            return res.status(200).json(addressId)
        } else{
            return res.status(404).json("address not found...")
        }
    }catch(error){
        return res.status(500).json('Internal server error!');
    }
}

export const updateAddress = async (req, res, next) => {
    try {
        const userId = await addressdetail.findById({ _id: req.params.id })
        if (userId) {
            await addressDetails.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            return res.status(200).json("Address updated")

        } else {
            return res.status(404).json("address not found...")
        }
    } catch (error) {
        return res.status(500).json('Internal server error!');
    }
}

export const deleteAddress = async (req, res, next) => {
    try {
        const userId = await addressdetail.findById({ _id: req.params.id })
        if (userId) {
            await addressDetails.findByIdAndDelete(userId);
            return res.status(200).json("Address deleted")

        } else {
            return res.status(404).json("address not found...")
        }
    } catch (error) {
        return res.status(500).json('Internal server error!');
    }
}

