import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "mascotas",
})
export default class Mascota extends Model {
    @Column({
        type: DataType.STRING(100),
    })
    nombre: string;

    @Column({
        type: DataType.STRING(100),
    })
    raza: string;

    @Column({
        type: DataType.STRING(10),
    })
    sexo: string;

    @Column({
        type: DataType.STRING(50),
    })
    color: string;

    @Column({
        type: DataType.DATEONLY,
    })
    fecha_nacimiento: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    peso: number;

    @Column({
        type: DataType.INTEGER,
    })
    numero_patas: number;

    @Column({
        type: DataType.BOOLEAN,
    })
    esterilizado: boolean;
}