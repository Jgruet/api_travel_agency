import connection from "../../config/db.js";

export default class TravelRepository {
    async getAll() {
        const [rows] = await connection.execute("SELECT * FROM `travel`");
        return rows;
    }

    async getById(id) {
        const [rows] = await connection.execute(
            "SELECT * FROM `travel` WHERE `id_travel` = ?",
            [id]
        );
        return rows[0];
    }

    async createTravel(travel) {
        const insertRq = await connection.execute(
            "INSERT INTO `travel` (`destination`, `id_hotel`, `board_type`, `margin`, `reduction`) VALUES (?, ?, ?, ?, ?)",
            [
                travel.destination,
                travel.id_hotel,
                travel.board_type,
                travel.margin,
                travel.reduction,
            ]
        );
        return insertRq[0].insertId;
    }

    async updateTravel(id, travel) {
        const updateRq = await connection.execute(
            "UPDATE `travel` SET `destination` = ?, `id_hotel` = ?, `board_type` = ?, margin` = ?, `reduction` = ? WHERE `travel`.`id_travel` = ?",
            [
                travel.destination,
                travel.id_hotel,
                travel.board_type,
                travel.margin,
                travel.reduction,
                id,
            ]
        );
        return updateRq[0].affectedRows;
    }

    async deleteTravel(id) {
        const deleteRq = await connection.execute(
            "DELETE FROM `travel` WHERE `travel`.`id_travel` = ?",
            [id]
        );
        return deleteRq[0].affectedRows;
    }
}
