import { Column , DataType, Table, Model, Default} from "sequelize-typescript"


type ProductsType = {
    idProducts: number,
    name: string,
    price: number,
    availability: boolean
}

@Table({
    tableName: 'productos',
    timestamps: false
})


class Products extends Model<ProductsType>{
    
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
        type: DataType.DECIMAL(6,2),
        allowNull: false
    })
     declare price: number;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
     declare availability: boolean

}


export default Products;