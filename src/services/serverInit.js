import { InternalServerError } from "../errors/TypesError.js";
import { initializeDB } from "./initializeDB.js";




export const serverInit = async(app, port) => {
    try {
        console.log('Verificando conexión con PostgreSQL');
        await initializeDB();
        
        app.listen(port, () => {
            console.log(`Servidor andando en el puerto: ${port}⚡`);
        });
    } catch (error) {
        throw new InternalServerError('Error al arrancar el servidor',  error)
    }
}
