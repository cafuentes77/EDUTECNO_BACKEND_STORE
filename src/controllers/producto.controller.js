import { Producto } from "../models/producto.model.js";


export const createProduct = async(req, res, next) => {
    try {
        const product = await Producto.create(req.body);

        res.status(201).json({
            message: "Producto creado correctamente",
            status: 200,
            data: product
        })
    } catch (error) {
        next(error)
    }
}