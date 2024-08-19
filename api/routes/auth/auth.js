import express from 'express';
import { adminLogin, login, register, registerAdmin, resetPassword, sendEmail } from '../../controllers/auth controllers/auth.controller.js';

const router= express.Router();


//register
router.post("/registration", register);

//login
router.post("/login", login);

//Adminlogin
router.post("/admin-login", adminLogin);


//register as admin
router.post("/register-admin",registerAdmin)


//send reset email

router.post("/send-email",sendEmail)

//rest password
router.post("/reset-password", resetPassword)

export default router;