//código que limpia la base de datos luego de hacer pruebas
import { exit } from 'node:process'
import database from '../config/database'

const clearDatabase = async () => {
    try {
        await database.sync({force: true})
        console.log('Base de datos eliminada correctamente')
        exit(0)
    } catch (error) {
        console.log(error)
        exit(1);
    }
}

if(process.argv[2] === '--clear'){
    clearDatabase();
}