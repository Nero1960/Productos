import {Sequelize} from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

const database = new Sequelize(process.env.DATABASE_URI, {
    dialect: 'mysql',
    port: 3306,
    models: [__dirname + '/../models/**/*.ts'],
    logging: false
})

export default database;