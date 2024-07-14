import express, {Request, Response } from 'express'
import colors from 'colors'
import router from './routes';
import database from './config/database';


//Comprobar la conexión a la base de datos
const connectDB = async () => {
    try {
        await database.authenticate();
        database.sync();
        //console.log(colors.bgGreen.white('Conexión exitosa a la base de datos'))
    } catch (error) {
        //console.log(colors.bgRed.white('Error de conexión en la base de datos'), error);
    }
}


connectDB();

//Instancia de express
const server = express();

//Habilitar leer formulario
server.use(express.json());

//routes
server.use('/api/products', router)

server.get('/api',(request, response) => {
    response.json({msg: 'Hola'})

})


export default server;