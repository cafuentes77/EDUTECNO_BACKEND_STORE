import { query } from "../../config/db.config.js";
import { getTableDetails, tableExists } from "./confirmDetailsTables.js";

export class TableDb {
  static async create({ queryText, name }) {
      try {
          const exists = await tableExists(name);
          await query(queryText)
          const tableDetails = await getTableDetails(name);
  
          exists
            ? console.log(`Tabla "${name}" ya existe en la base de datos. Detalles: `)
            : console.log(`Tabla "${name}" verificada y creada con éxito. Detalles: `);
  
          
          console.table(tableDetails)
  
      } catch (error) {
          console.error(`Error al crear la tabla ${name}. ERROR: ${error}`)
      }
  };
  
}