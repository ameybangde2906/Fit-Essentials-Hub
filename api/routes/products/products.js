import express from 'express';
import { addProduct, createProduct, deleteProducts, getaccTypeDiscount, getAllproduct, getAllproducts, getbyId, getProductsByBrand, getProductsByCategory, getProductsByType, getrelatedProducts, getsuppDiscount, getsuppTypeDiscount, updateProduct } from '../../controllers/product controllers/product.controller.js';

const router= express.Router();


router.get('/', getAllproducts);
router.get('/products/:key', getAllproduct);
router.get('/relatedProducts/:key/:id',getrelatedProducts)
router.get('/productsbytype/:key',getProductsByType)
router.get('/productsbycategory/:key',getProductsByCategory)
router.get('/getbybrands/:key',getProductsByBrand)
router.get('/suppdiscount/:key',getsuppDiscount)
router.get('/supptypediscount/:key',getsuppTypeDiscount)
router.get('/acctypediscount/:key',getaccTypeDiscount)

router.get('/:id' , getbyId);

router.post('/create', createProduct);
router.post("/addproduct",addProduct);

router.put('/update/:id',updateProduct );

router.delete('/delete/:id',deleteProducts );



export default router;