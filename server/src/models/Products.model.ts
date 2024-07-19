import { Column, DataType, Table, Model, Default } from "sequelize-typescript"

@Table({
    tableName: 'productapp',
    timestamps: false
})



class Products extends Model {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
    declare idProducts: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.DECIMAL(6, 2),
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('price');
            return parseFloat(rawValue);
        },
    })
    declare price: number;

    @Default(1)
    @Column({
        type: DataType.TINYINT,
        allowNull: false
    })
    declare availability: number


}


export default Products;