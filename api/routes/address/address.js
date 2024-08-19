import express from 'express';
import { addressDetails, deleteAddress, getAddress, getAddressById, updateAddress } from '../../controllers/address controllers/address.controller.js';

const router= express.Router();

router.post("/address", addressDetails)

router.get("/getaddress/:key", getAddress)

router.get("/getAddressbyid/:id", getAddressById)

router.put("/update/:id", updateAddress)

router.delete("/delete/:id",deleteAddress)

export default router