import {Sequelize} from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

const database = new Sequelize('productos', "root", "root", {
    dialect: 'mysql',
    models: [__dirname + '/../models/**/*.ts'],
    logging: false
})

export default database;