import { InternalServerError } from "../../errors/TypesError";
import { query } from "../../config/db.config.js";

/**
 * Crea un nuevo registro en una tabla especifica a traves de un objeto
 * @param {string} tableName - Nombe de la tabla en la base de datos
 * @param {object} data - - Datos que se enviaran a registrar
 * @returns {promise<object} - Retorna el registro creado en formato de objeto
 */

export const createRecord = async(tableName, data) => {
    try {
        const columns = Object.keys(data);  // deveuleve un array con todas las claves de un objeto dado (campos)
        const values = Object.values(data);  // devuelve un array con todos los valores de un objeto dado
        const placeholders = columns.map((_, i) => `${i + 1}`);

        const insertQuery = `
            INSERT INTO ${tableName} (${columns.join(', ')})  // unir todos los campos con una coma
            VALUES (${placeholders.join(', ')})
            RETURNING *
        `
        const { rows } = await query(insertQuery, values);
        return rows[0];  // devuelve el primer elemento del array rows
    } catch (error) {
        throw new InternalServerError(`Error al crear un registro', ${tableName}`);
    }
}