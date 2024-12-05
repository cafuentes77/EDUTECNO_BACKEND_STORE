import { TableDb } from "../utils/db/createDbTables.js";

import { connectDB } from '../utils/db/connectDB.js'
import { createTableQueries } from "../utils/constants/createTablesQueries.js";


export const initializeDB = async() => {
    try {
        for (const query of createTableQueries) {
            await TableDb.create(query)
        }

        console.log('Tablas cargadas con éxito!');

        const { now } = await connectDB();
        console.log(`Conexión éxitosa a PostgreSQL realizada el ${now}`);

    } catch (error) {
        console.error('Error al inicializar la base de datos en PostgreSQL');
    }
};