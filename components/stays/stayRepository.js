import connection from "../../config/db.js";

export default class StayRepository {
    async getAll() {
        const [rows] = await connection.execute("SELECT * FROM `stay`");
        return rows;
    }

    async getById(id) {
        const [rows] = await connection.execute(
            "SELECT * FROM `stay` WHERE `id_stay` = ?",
            [id]
        );
        return rows[0];
    }

    async createStay(stay) {
        const insertRq = await connection.execute(
            "INSERT INTO `stay` (id_travel, start_at, end_at, id_main_customer) VALUES (?, ?, ?, ?)",
            [stay.id_travel, stay.start_at, stay.end_at, stay.id_main_customer]
        );
        return insertRq[0].insertId;
    }

    async updateStay(id, stay) {
        const updateRq = await connection.execute(
            "UPDATE `stay` SET `id_travel` = ?, `start_at` = ?, `end_at` = ?, id_main_customer` = ? WHERE `stay`.`id_stay` = ?",
            [
                stay.id_travel,
                stay.start_at,
                stay.end_at,
                stay.id_main_customer,
                id,
            ]
        );
        return updateRq[0].affectedRows;
    }

    async deleteStay(id) {
        const deleteRq = await connection.execute(
            "DELETE FROM `stay` WHERE `stay`.`id_stay` = ?",
            [id]
        );
        return deleteRq[0].affectedRows;
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
