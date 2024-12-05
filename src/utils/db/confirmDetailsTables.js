

export const getTableDetails = async (tableName) => {
    try {
        const queryDictionary = `
          SELECT
          column_name,
          data_type,
          is_nullable,
          is_unique
          FROM
          information_schema.columns
          WHERE
          table_name = $1
          ORDER BY
          ordinal_position;
        `;
        const value = [tableName];
        const { rows } = await query(queryDictionary, value);
    } catch (error) {
        console.error(`Error al crear el diccionario de la tabla ${tableName}. ERROR: ${error}`)
    }
}

const tableExists = async (tableName) => {
    try {
        const query = `SELECT EXISTS(
            SELECT FROM information_schema.tables 
            WHERE table_name = $1
            )
            `
    
    } catch (error) {
        
    }


}