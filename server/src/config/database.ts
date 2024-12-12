import {Sequelize} from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

const database = new Sequelize(process.env.DATABASE_URI, {
    dialect: 'mysql',
    models: [__dirname + '/../models/**/*.{js,ts}'],
    logging: false
})

export default database;