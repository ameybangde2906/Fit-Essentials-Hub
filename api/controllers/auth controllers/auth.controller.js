import Role from "../../models/auth model/Role.js";
import User from "../../models/auth model/User.js";
import bcrypt from "bcryptjs"
import { CreateSuccess } from "../../utils/success.js";
import jwt  from "jsonwebtoken";
import nodemailer from "nodemailer"
import UserToken from "../../models/auth model/UserToken.js";
import { CreateError } from "../../utils/error.js";

export const register = async (req, res, next)=> {
    const role= await Role.find({role: "User"});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.userName,
        email: req.body.email,
        password: hashPassword,
        roles: role
    });
    await newUser.save();
    return res.status(200).json("user Registered Successfully!");
}

export const registerAdmin = async (req, res, next)=> {
    const role= await Role.find({});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        isAdmin:true,
        roles: role
    });
    await newUser.save();
    return next(CreateSuccess(200, "admin Registered Successfully!"));
}


export const login = async(req, res, next)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        .populate("roles","role");

        const {roles}=user;
        if(!user){
            return res.status(404).send("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect){
            return res.status(400).send("password is incorrect");
        }

        const token = jwt.sign(
        {id: user._id, isAdmin: user.isAdmin, roles: roles},
        process.env.JWT_SECRET
        )
        res.cookie("mycostom_token",token,{httpOnly:true,expires:new Date(Date.now() + 25892000000,)})
        .status(200)
        .json({
            status:200,
            message: "login success",
            data:user
        })
        console.log(token)
    
    } catch (error){
        return res.status(500).send("something sent wrong");
    }
}

export const adminLogin = async(req, res, next)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        .populate("roles","role");

        const {roles}=user;
        if(!user){
            return res.status(404).send("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect){
            return res.status(400).send("password is incorrect");
        }
        if (!user.isAdmin) {
            return res.status(403).json({ status: 403, message: "Access forbidden. User is not an admin." });
        }

        const token = jwt.sign(
        {id: user._id, isAdmin: user.isAdmin, roles: roles},
        process.env.JWT_SECRET
        )
        res.cookie("mycostom_token",token,{httpOnly:true,expires:new Date(Date.now() + 25892000000,)})
        .status(200)
        .json({
            status:200,
            message: "admin login success",
            data:user
        })
        console.log(token)
    
    } catch (error){
        return res.status(500).send("something sent wrong");
    }
}

export const sendEmail=async (req, res, next)=>{
    const email= req.body.email;
    const user= await User.findOne({email: {$regex:'^'+email+'$',$options: 'i'} })
    if(!user){
        return next(CreateError(404, "User not found to rest the password !"))
    }
    const payload={
        email:user.email
    }
    const expirayTime=300;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:expirayTime})

    const newToken= new UserToken({
        userId: user._id,
        token: token
    });

    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:"ameybangde@gmail.com",
            pass:"wboz wguy ilgj ubvk"
        }
    });

    let mailDetails= {
        from: "ameybangde@gmail.com",
        to: email,
        subject: "Reset Password",
        html: `
        <html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
        }

        p {
            color: #555;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3498db;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }

        .btn:hover {
            background-color: #2980b9;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Password Reset</h1>
        <p>Hello ${user.username},</p>
        <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
        <p>Click the button below to reset your password:</p>
        <a href= ${process.env.LIVE_URL}/reset/${token} class="btn">Reset Password</a>
       <p>Please note that this link is only valid for 5mins</p>
        <p>If you have any questions or concerns, please contact our support team.</p>
        <p>Thank you,</p>
        <p>FitEssentials Hub</p>
    </div>
</body>
</html>`
    };
    mailTransporter.sendMail(mailDetails, async(err,data)=>{
        if(err){
            console.log(err);
            return next(CreateError(500, "Something went wrong while sending the email"))
        }else{
            await newToken.save();
            return next(CreateSuccess(200, "Email sent successfully"))
        }
    })
}


export const resetPassword=(req, res, next)=>{
    const token= req.body.token;
    const newPassword =req.body.password;

    jwt.verify(token, process.env.JWT_SECRET, async(err, data)=>{
        if(err){
            return next(CreateError(500, "reset link is expired"))
        }else{
            const response=data;
            const user= await User.findOne({email: {$regex:'^'+response.email+'$',$options: 'i'} })
            const salt= await bcrypt.genSalt(10);
            const encryptedPassword= await bcrypt.hash(newPassword, salt);
            user.password = encryptedPassword;
            try{
                const updatedUser= await User.findOneAndUpdate(
                    {_id: user._id},
                    {$set: user},
                    {new: true}
                )
                return next(CreateSuccess(200, "Password reset success"));   
            }catch (error){
                return (CreateError(500, "Something went wrong while reseting the password"))
            }
        }
    })
}