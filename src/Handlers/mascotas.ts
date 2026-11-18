import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import Mascota from '../models/Mascota.model';

export const createMascota = async (req: Request, res: Response) => {
    try {
        await check("nombre")
            .notEmpty()
            .withMessage("El nombre de la mascota no puede ir vacío")
            .run(req);
        await check("sexo")
            .notEmpty()
            .withMessage("El sexo no puede ir vacío")
            .isIn(["macho", "hembra"])
            .withMessage("El sexo debe ser 'macho' o 'hembra'")
            .run(req);
        await check("peso")
            .notEmpty()
            .withMessage("El peso no puede ir vacío")
            .isNumeric()
            .withMessage("Valor no válido")
            .custom((value) => value > 0)
            .withMessage("El peso debe ser mayor a 0")
            .run(req);
        await check("numero_patas")
            .notEmpty()
            .withMessage("El número de patas no puede ir vacío")
            .isInt({ min: 0, max: 4 })
            .withMessage("El número de patas debe ser un entero entre 0 y 4")
            .run(req);
        await check("fecha_nacimiento")
            .optional()
            .isDate()
            .withMessage("La fecha debe tener el formato AAAA-MM-DD")
            .run(req);
        await check("esterilizado")
            .optional()
            .isBoolean()
            .withMessage("Esterilizado debe ser true o false")
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const mascota = await Mascota.create(req.body);
        return res.status(201).json({ data: mascota });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Hubo un error en el servidor" });
    }
};

export const getMascotas = async (req: Request, res: Response) => {
    try {
        const mascotas = await Mascota.findAll();
        return res.json({ data: mascotas });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Hubo un error al obtener las mascotas' });
    }
};

export const getMascotaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mascota = await Mascota.findByPk(id);
        if (!mascota) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        return res.json({ data: mascota });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Hubo un error al buscar la mascota' });
    }
};

export const actualizarMascota = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mascota = await Mascota.findByPk(id);
        if (!mascota) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        const mascotaActualizada = await mascota.update(req.body);
        return res.status(200).json({ data: mascotaActualizada });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Hubo un error al actualizar la mascota' });
    }
};

export const eliminarMascota = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mascota = await Mascota.findByPk(id);
        if (!mascota) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        await mascota.destroy();
        return res.json({ data: 'Mascota eliminada' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Hubo un error al eliminar la mascota' });
    }
};