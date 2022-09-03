import connection from "../../config/db.js";

export default class StayRepository {
    async getAll(limit, offset) {
        const [count] = await connection.execute(
            'SELECT COUNT(id_stay) as total FROM `stay`'
        );
        const [rows] = await connection.execute('SELECT * FROM `stay` LIMIT ? OFFSET ?', [limit, offset]);
        let result = {};
        result.count = count[0].total;
        result.stays = rows;
        return result;
    }

    async getById(id) {
        const [count] = await connection.execute(
            'SELECT COUNT(id_stay) as total FROM `stay` WHERE id_stay = ?', [id]
        );
        const [rows] = await connection.execute(
            "SELECT * FROM `stay` WHERE `id_stay` = ?",
            [id]
        );
        let result = {};
        result.count = count[0].total;
        result.stay = rows;
        return result;
    }

    async createStay(stay) {
        try {
            const insertRq = await connection.execute(
                "INSERT INTO `stay` (id_travel, start_at, end_at, id_main_customer) VALUES (?, ?, ?, ?)",
                [stay.id_travel, stay.start_at, stay.end_at, stay.id_main_customer]
            );
            return {"insertId" : insertRq[0].insertId};
        } catch (error) {
            if(error.code === "ER_NO_REFERENCED_ROW_2"){
                return {SQLError : "Specified customer does not exist"};
            }
        }
        
    }

    async updateStay(id, stay) {
        const updateRq = await connection.execute(
            "UPDATE `stay` SET `id_travel` = ?, `start_at` = ?, `end_at` = ?, `id_main_customer` = ? WHERE `stay`.`id_stay` = ?",
            [
                stay.id_travel,
                stay.start_at,
                stay.end_at,
                stay.id_main_customer,
                id,
            ]
        );
        return {"affectedRows" : updateRq[0].affectedRows};
    }

    async deleteStay(id) {
        const deleteRq = await connection.execute(
            "DELETE FROM `stay` WHERE `stay`.`id_stay` = ?",
            [id]
        );
        return {"affectedRows" : deleteRq[0].affectedRows};
    }

    async bindCustomers(idStay, idCustomers) {
        let affectedRow = 0;
        idCustomers.forEach(async (idCustomer) => {
            let bindRq = await connection.execute(
                "INSERT INTO `stay_customer` (id_stay, id_customer) VALUES (?, ?)",
                [idStay, idCustomer]
            );
            if (bindRq[0].affectedRows == '1'){
                affectedRow++;
            }
        })
        
        return affectedRow;
    }

    async bindFlightBooking(idCustomer, idFlight) {
        const insertRq = await connection.execute(
            "INSERT INTO `plane_booking` (id_plane_booking, id_customer) VALUES (?, ?)",
            [idFlight, idCustomer]
        );
        return insertRq[0].insertId;
    }
    async bindHotelBooking(idCustomer, idHotel) {
        const insertRq = await connection.execute(
            "INSERT INTO `hotel_booking` (id_hotel_booking, id_customer) VALUES (?, ?)",
            [idHotel, idCustomer]
        );
        return insertRq[0].insertId;
    }
}
