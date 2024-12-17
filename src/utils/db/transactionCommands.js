import { getClient } from "../../config/db.config.js";
import { DataBaseError } from "../../errors/TypesError.js";


export const beginTransaction = async () => {
    try {
        const client = await getClient();

        await client.query("BEGIN");
        return client;
    } catch (error) {
        client.release();
        throw new DataBaseError('Error al iniciar la  transaccion', error);
    }
};

export const commitTransaction = async (transaction) => {
    try {
        const client = await getClient();

        await client.query("COMMIT");
        console.log('commit realizado con exito')
    } catch (error) {
        throw new DataBaseError('Error al confirmar la transaccion', error);
    } finally {
        client.release();
    }
}


export const rollbackTransaction = async (transaction) => {
    try {
        const client = await getClient();

        await client.query("ROLLBACK");
        console.log('volviendo al punto de guardado más cercano')
    } catch (error) {
        throw new DataBaseError ('Error al revertir la transaccion', error);
    }
}