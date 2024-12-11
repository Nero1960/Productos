import express  from 'express'
import swaggerUI from 'swagger-ui-express' 
import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerSpec from './config/swagger';
import router from './routes';
import database from './config/database';


//Comprobar la conexión a la base de datos
const connectDB = async () => {
    try {
        await database.authenticate();
        database.sync();
        console.log(colors.bgGreen.white('Conexión exitosa a la base de datos'))
    } catch (error) {
        console.log(colors.bgRed.white('Error de conexión en la base de datos'), error);
    }
}

connectDB();

//Instancia de express
const server = express();

//permitir conexiones

const corsOptions : CorsOptions = {
    origin: function(origin, callback){

        const whiteList = [process.env.FRONTEND_URL, undefined, process.env.BACKEND_URL]
        if(whiteList.includes(origin)){
            callback(null, true)
        } else {
            callback(new Error('Error de cors'), false)
        }
    }
}
server.use(cors(corsOptions))

//Habilitar leer formulario
server.use(express.json());

server.use(morgan('dev'))
//routes
server.use('/api/products', router)

//DOCS
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec) );

export default server;