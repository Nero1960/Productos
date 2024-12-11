import {Sequelize} from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

const database = new Sequelize('productapp', "root", "root", {
    dialect: 'mysql',
    port: 3307,
    models: [__dirname + '/../models/**/*.ts'],
    logging: false
})

export default database;