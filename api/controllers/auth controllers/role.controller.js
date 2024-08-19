import Role from '../../models/auth model/Role.js'
import User from '../../models/auth model/User.js';
import { CreateError } from '../../utils/error.js';
import { CreateSuccess } from '../../utils/success.js';

export const createRole =  async (req, res, next) => {
    try {
        if (req.body.role && req.body.role !== '') {
            const newRole = new Role(req.body);
            await newRole.save();
            return next(CreateSuccess(200, "role created!"))
        } else {
            return next(CreateError(400, "bad request"));
        }
    } catch (error) {
        return next(CreateError(500, "internal server error"));
    }
}

export const updateRole = async (req, res, next) => {
    try {
        const role = await Role.findById({ _id: req.params.id });
        if (role) {
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            return res.status(200).send("role updated")

        } else {
            return res.status(404).send("role not found...")
        }
    } catch (error) {
        return res.status(500).send('Internal server error!');
    }

}

export const getAllRoles= async (req, res, next) =>{
    try {
        const roles = await Role.find({});
        return res.status(200).send(roles);
    } catch (error) {
        return res.status(500).send("internal server error!");
    }

}

export const deleteRole = async (req ,res, next)=>{
    try {
        const roleId =req.params.id;
        const role= await Role.findById({_id: roleId})
        if(role){
await Role.findByIdAndDelete(roleId);
return res.status(200).send("role deleted");
        }else{
            return res.status(404).send("role not found!")
        }
    } catch (error) {
        return res.status(500).send("internal server error!")
    }
}

export const getById= async (req,res,next) =>{
    try {
        const role=await User.findById({_id:req.params.id});
        return res.status(200).send(role);
    } catch (err) {
        return res.status(500).send("internal server error")
        
    }
}

export const updateById=async (req,res,next)=>{
    const role = await User.findById({ _id: req.params.id });
    if (role) {
        const newData = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).json("role updated")

    } else {
        return res.status(404).json("role not found...")
    }
}
