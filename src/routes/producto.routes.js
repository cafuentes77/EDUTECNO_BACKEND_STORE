import { Router } from 'express';

import { validationMiddleware } from '../middlewares/validate.middleware.js';
import { Producto } from '../models/producto.model.js';
import { createProduct } from '../controllers/producto.controller.js';



const router = Router();

router.post('/producto', validationMiddleware(Producto.validate), createProduct);

export default router