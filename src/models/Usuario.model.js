import { v4 as uuidv4 } from 'uuid'
import { DataBaseError, ValidationError } from '../errors/TypesError.js';
import { Validation } from '../utils/validate/Validate.js';
import { 
    createRecord, 
    findActiveRecordById, 
    findAllActiveRecords, 
    findRecordByFilters, 
    permaDeleteRecord, 
    softDeleteRecord, 
    updateRecord } from '../utils/crud/index.js';




export class Usuario {
    constructor({ id, nombre, apellido_paterno, apellido_materno, email, telefono }) {
        this.id = id;
        this.nombre = nombre;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.email = email;
        this.telefono = telefono;
        this.active = true
    }

    static validate(data) {
        const errors = [];

        const { nombre, apellido_paterno, apellido_materno, email, telefono } = data;
        let nombreValido, apellido_paternoValido, apellido_maternoValido, emailValido, telefonoValido;

        try {
            nombreValido = Validation.isNonEmptyString(nombre, 'nombre');
            nombreValido = Validation.name(nombre, 'nombre');
        } catch (error) {
            errors.push(error)
        }

        try {
            apellido_paternoValido = Validation.isNonEmptyString(apellido_paterno, 'apellido_paterno');
            apellido_paternoValido = Validation.name(apellido_paterno, 'apellido_paterno');
        } catch (error) {
            errors.push(error)
        }

        try {
            apellido_maternoValido = Validation.isNonEmptyString(apellido_materno, 'apellido_materno');
            apellido_maternoValido = Validation.name(apellido_materno, 'apellido_materno');
        } catch (error) {
            errors.push(error)
        }

        try {
            emailValido = Validation.isNonEmptyString(email, 'email');
            emailValido = Validation.email(email);
        } catch (error) {
            errors.push(error)
        }

        try {
            telefonoValido = Validation.isNonEmptyString(telefono, 'telefono');
            telefonoValido = Validation.phone(telefono);
        } catch (error) {
            errors.push(error)
        }

        if(errors.length > 0) throw new ValidationError('Error al validar usuario', errors);

        return {
            nombre: nombreValido,
            apellido_paterno: apellido_paternoValido,
            apellido_materno: apellido_maternoValido,
            email: emailValido,
            telefono: telefonoValido
        }
    }

    static async create(data) {
        try {
            /*  Usuario.validate(data); */
            const id = uuidv4();
            const active = true;

            const user = { id, ...data, active }

            const userRecorded = await createRecord('usuarios', user)
            return userRecorded

        } catch (error) {
            throw new DataBaseError('Error al registrar el usuario en la base de datos', error)
        }
    }

    static async findAllActive() {
        try {
            const users = await findAllActiveRecords('usuarios');
            return users;
        } catch (error) {
            throw new DataBaseError(`Error al obtener los registros de los usuarios en la base de datos`, error);
        }
    }


    static async findActiveById(id) {
        try {
            const user = await findActiveRecordById('usuarios', id);
            return user;
        } catch (error) {
            throw new DataBaseError(`No pudimon encontrar el usuario con el id ${id}`, error);
        }
    }

    static async find(filters, condition) {
        try {

            const users = await findRecordByFilters('usuarios', filters, condition);
            return users;
        } catch (error) {
            throw new DataBaseError(`No pudimos encontrar los usuarios con los filtros:
                ${JSON.stringify(filters)} 
                y la condición: ${condition}
                `, error);
        }
    }


static async update(id, data) {
    try {
        const updateUser = await updateRecord('usuarios', id, data);
        return updateUser;
    } catch (error) {
        throw new DataBaseError(`Error al actualizar el usuario cons el ID ${id}`, error);
    }
}

static async permaDelete(id) {
    try {
        await permaDeleteRecord('usuarios', id);
        return userDeleted
    } catch (error) {
        throw new DataBaseError(`No pudimos eliminar permanentemente al usuario`, error);
    }
}

static async softDelete(id) {
    try {
        const userDeleted = await softDeleteRecord('usuarios', id);
        return userDeleted;
    } catch (error) {
        throw new DataBaseError(`No pudimos eliminar permanentemente al usuario`, error);
    }
}

}
