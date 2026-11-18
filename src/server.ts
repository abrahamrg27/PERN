import express from 'express';
import router from './router';
import db from './config/db';

async function connectDB() {
    try {
        await db.authenticate();
        await db.sync({ alter: true });
        console.log('Conexión exitosa a la BD');
    } catch (error) {
        console.log('Hubo un error de conexión');
        console.log(error);
    }
}
connectDB();



const server = express();
server.use(express.json());
server.use('/api', router);

export default server;