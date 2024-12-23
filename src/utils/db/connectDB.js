import { query } from "../../config/db.config.js"
import { DataBaseError } from "../../errors/TypesError.js"

export const connectDB = async () => {
    try {
        const { rows } = await query('SELECT NOW()');
        return rows[0]
    } catch (error) {
        throw new DataBaseError(`No nos pudinmos conectar a la DB`, error)
    }
}