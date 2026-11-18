import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json({ data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error al obtener los productos' });
    }
};
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ data: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error al buscar el producto' });
    }
};
export const CreateProduct = async (req: Request, res: Response) => {
    await check('name')
        .notEmpty().withMessage('El nombre de producto no puede ir vacio')
        .run(req);

    await check('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puedo ir vacio')
        .custom(value => value > 0).withMessage('El precio no puede ser menor a 0')
        .run(req);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.json({ data: savedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error al guardar el producto' });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        const updatedProduct = await product.update(req.body);
        return res.status(200).json({ data: updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error al actualizar el producto' });
    }
};
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await product.destroy();
        res.json({ data: 'Producto eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error al eliminar el producto' });
    }
};