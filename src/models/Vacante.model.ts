import { Table, Column, Model, DataType, AllowNull, Default } from "sequelize-typescript";

@Table({
    tableName: 'vacantes'
})
class Vacante extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(150)
    })
    titulo: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(120)
    })
    empresa: string

    @Column({
        type: DataType.TEXT
    })
    descripcion: string

    @Column({
        type: DataType.ARRAY(DataType.STRING)
    })
    requisitos: string[]

    @Column({
        type: DataType.STRING(100)
    })
    ubicacion: string

    @Column({
        type: DataType.ENUM('presencial', 'remoto', 'hibrido')
    })
    modalidad: string

    @Column({
        type: DataType.ENUM('tiempo_completo', 'medio_tiempo', 'temporal', 'practicas', 'freelance')
    })
    tipoContrato: string

    @Column({
        type: DataType.DECIMAL(10, 2)
    })
    salarioMin: number

    @Column({
        type: DataType.DECIMAL(10, 2)
    })
    salarioMax: number

    @Default(1)
    @Column({
        type: DataType.INTEGER
    })
    plazasDisponibles: number

    @Column({
        type: DataType.DATEONLY
    })
    fechaLimite: Date

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    activa: boolean
}

export default Vacante;