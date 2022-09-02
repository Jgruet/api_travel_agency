import connection from "../../config/db.js";

export default class CustomerRepository {
    async getAll(limit, offset) {
        const [count] = await connection.execute(
            `SELECT COUNT(id_customer) as total FROM customer`
        );
        const [rows] = await connection.execute(`SELECT * FROM customer LIMIT ? OFFSET ?`, [limit, offset]);
        let result = {};
        result.count = count[0].total;
        result.customers = rows;
        return result;
    }

    async getById(id) {
        const [count] = await connection.execute(
            `SELECT COUNT(id_customer) as total FROM customer WHERE id_customer = ?`, [id]
        );
        const [rows] = await connection.execute(
            "SELECT * FROM `customer` WHERE `id_customer` = ?",
            [id]
        );
        let result = {};
        result.count = count[0].total;
        result.customer = rows;
        return result;
    }

    async createCustomer(customer) {

        if(customer.idUser === undefined){
            customer.idUser = null;
        }
        try{
            const insertRq = await connection.execute(
            "INSERT INTO `customer` (`firstname`, `lastname`, `birthdate`, `id_user`) VALUES (?, ?, ?, ?)",
            [
                customer.firstname,
                customer.lastname,
                customer.birthdate,
                customer.idUser
            ]
            );
            return {"insertId" : insertRq[0].insertId};
        } catch(error){
            if(error.code === "ER_NO_REFERENCED_ROW_2") {
                return {SQLError : "Specified user does not exist"};
            } else if(error.code === "ER_DUP_ENTRY") {
                return {SQLError : "A customer is already bind to the given user"};
            }
        }
        
    }

    async updateCustomer(id, customer) {
        try{
        const updateRq = await connection.execute(
            "UPDATE `customer` SET `firstname` = ?, `lastname` = ?, `birthdate` = ? WHERE `customer`.`id_customer` = ?",
            [
                customer.firstname,
                customer.lastname,
                customer.birthdate,
                id,
            ]
        );
        return {"affectedRows" : updateRq[0].affectedRows};
        } catch(error){
            console.log(error.code);
        }
    
    }

    async deleteCustomer(id) {
        const deleteRq = await connection.execute(
            "DELETE FROM `customer` WHERE `customer`.`id_customer` = ?",
            [id]
        );
        return {"affectedRows" : deleteRq[0].affectedRows};
    }

    async clearCustomers() {
        await connection.execute("DELETE FROM `customer` WHERE 1");
    }

    async getCustomersByHolydayPeriod(from, to, limit, offset) {
        const [count] = await connection.execute(
            `SELECT COUNT(c.id_customer) as total FROM customer c JOIN stay s ON c.id_customer = s.id_main_customer WHERE (? >= s.start_at AND ? <= s.end_at) OR ((? >= s.start_at AND ? <= s.end_at) ) OR (?<s.start_at AND ?>s.end_at)`,
            [from, from, to, to, from, to]
        );
        const [rows] = await connection.execute(
            `SELECT c.id_customer, c.email, s.id_travel, s.start_at, s.end_at FROM customer c JOIN stay s ON c.id_customer = s.id_main_customer WHERE (? >= s.start_at AND ? <= s.end_at) OR ((? >= s.start_at AND ? <= s.end_at) ) OR (?<s.start_at AND ?>s.end_at) LIMIT ? OFFSET ?`,
            [from, from, to, to, from, to, limit, offset]
        );
        let result = {};
        result.count = count[0].total;
        result.customers = rows;
        return result;
    }

    async getCustomerInfoByHotelBooking(id_booking, limit, offset) {
        const [count] = await connection.execute("SELECT COUNT(c.id_customer) as total FROM `hotel_booking` AS hb INNER JOIN stay_customer AS sc ON sc.id_customer=hb.id_customer INNER JOIN stay_customer AS sc2 ON sc.id_stay=sc2.id_stay INNER JOIN customer AS c ON sc2.id_customer=c.id_customer WHERE id_hotel_booking= ?", [id_booking]);
        const [rows] = await connection.execute("SELECT sc2.id_stay, c.firstname, c.lastname FROM `hotel_booking` AS hb INNER JOIN stay_customer AS sc ON sc.id_customer=hb.id_customer INNER JOIN stay_customer AS sc2 ON sc.id_stay=sc2.id_stay INNER JOIN customer AS c ON sc2.id_customer=c.id_customer WHERE id_hotel_booking= ? LIMIT ? OFFSET ?", [id_booking, limit, offset]);
        let result = {};
        result.count = count[0].total;
        result.customers = rows;
        return result;
    }

    async getCustomerInfoByPlaneBooking(id_booking, limit, offset) {
        const [count] = await connection.execute("SELECT COUNT(c.id_customer) as total FROM `plane_booking` AS hb INNER JOIN stay_customer AS sc ON sc.id_customer=hb.id_customer INNER JOIN stay_customer AS sc2 ON sc.id_stay=sc2.id_stay INNER JOIN customer AS c ON sc2.id_customer=c.id_customer WHERE id_plane_booking= ?", [id_booking]);
        const [rows] = await connection.execute("SELECT sc2.id_stay, c.firstname, c.lastname FROM `plane_booking` AS hb INNER JOIN stay_customer AS sc ON sc.id_customer=hb.id_customer INNER JOIN stay_customer AS sc2 ON sc.id_stay=sc2.id_stay INNER JOIN customer AS c ON sc2.id_customer=c.id_customer WHERE id_plane_booking= ? LIMIT ? OFFSET ?", [id_booking, limit, offset]);
        let result = {};
        result.count = count[0].total;
        result.customers = rows;
        return result;
    }
}
