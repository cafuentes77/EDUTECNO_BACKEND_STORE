import { getTableDetails } from "./confirmDetailsTables.js";

export const createUserTable = async (db) => {
    try {
        const queryCreate = `CREATE TABLE IF NOT EXISTS usuarios(
        id UUID PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        apellido_paterno VARCHAR(255) NOT NULL,
        apellido_materno VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        telefono VARCHAR(12),
        acive BOOLEAN DEFAULT TRUE
        );
        `;

        const exists = await tableExists('usuarios')
        const { rows } = await query(queryCreate)

        const tableDetails = await getTableDetails('usuarios');
        console.log('Tabla "usuarios');
        console.table(tableDetails);
    } catch (error) {
        console.error(`error al crear la tabla usuarios. ERROR: ${error}`)
    }
}