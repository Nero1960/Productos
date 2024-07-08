import {Sequelize} from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

const database = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
    dialect: 'mysql',
    models: [__dirname + '/../models/**/*.ts'],
    logging: false
})

export default database;