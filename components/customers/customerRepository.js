import connection from '../../config/db.js';

export default class CustomerRepository
{
    async getAll(){
        const [rows] = await connection.execute( 'SELECT * FROM `customer`');
        return rows;
    }

    async getById(id){
        const [rows] = await connection.execute( 'SELECT * FROM `customer` WHERE `id_customer` = ?', [id]);
        return rows[0];
    }

    async createCustomer(customer){
        if(customer.isCompanion === 0){
            const insertRq = await connection.execute( 
                'INSERT INTO `customer` (`firstname`, `lastname`, `birthdate`, `email`, `is_companion`) VALUES (?, ?, ?, ?, ?)',
                [customer.firstname, customer.lastname, customer.birthdate, customer.email, customer.isCompanion]
            );
            return insertRq[0].insertId;
        } else {
            const insertRq = await connection.execute( 'INSERT INTO `customer` (firstname, lastname, birthdate, is_companion) VALUES (?, ?, ?, ?)',
            [customer.firstname, customer.lastname, customer.birthdate, customer.isCompanion]);
            return insertRq[0].insertId;
        }
        
    }

    async updateCustomer(id, customer){
        if(customer.isCompanion === 0){
            const updateRq = await connection.execute( 'UPDATE `customer` SET `firstname` = ?, `lastname` = ?, `birthdate` = ?, email` = ? WHERE `customer`.`id_customer` = ?',
            [customer.firstname, customer.lastname, customer.birthdate, customer.email, id]);
            return updateRq[0].affectedRows;
        } else {
            const updateRq = await connection.execute( 'UPDATE `customer` SET `firstname` = ?, `lastname` =  ?, `birthdate` = ? WHERE `customer`.`id_customer` = ?',
            [customer.firstname, customer.lastname, customer.birthdate, id]);
            return updateRq[0].affectedRows;
        }
    }

    async deleteCustomer(id){
        const deleteRq = await connection.execute( 'DELETE FROM `customer` WHERE `customer`.`id_customer` = ?', [id]);
        return deleteRq[0].affectedRows;
    }
}