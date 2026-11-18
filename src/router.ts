import { Router } from 'express';
import { CreateProduct, getProducts, getProductById, updateProduct, deleteProduct } from './Handlers/products';
import { actualizarMascota, createMascota, eliminarMascota, getMascotaById, getMascotas } from './Handlers/mascotas';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', CreateProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

router.get('/mascotas', getMascotas);
router.get('/mascotas/:id', getMascotaById);
router.post('/mascotas', createMascota);
router.put('/mascotas/:id', actualizarMascota);
router.delete('/mascotas/:id', eliminarMascota);

export default router;