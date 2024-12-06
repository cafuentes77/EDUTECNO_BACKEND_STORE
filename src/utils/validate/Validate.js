

export class Validation {
    static isNotEmptystring(value, fieldName) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error(`The ${fieldName} no puede ser una cadena de texto vacia`); 
        }
    }
}