import connection from "../../config/db.js";

export default class TravelRepository {
    async getAll(limit, offset) {
        const [count] = await connection.execute("SELECT COUNT(id_travel) as total FROM `travel`");
        const [rows] = await connection.execute("SELECT * FROM `travel` LIMIT ? OFFSET ?", 
        [limit, offset]);
        let result = {};
        result.count = count[0].total;
        result.travels = rows;
        return result;
    }

    async getById(id) {
        const [count] = await connection.execute(
            `SELECT COUNT(id_travel) as total FROM travel WHERE id_travel = ?`, [id]
        );
        const [rows] = await connection.execute(
            "SELECT * FROM `travel` WHERE `id_travel` = ?",
            [id]
        );
        let result = {};
        result.count = count[0].total;
        result.travel = rows;
        return result;
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
        return {"insertId" :insertRq[0].insertId};
    }

    async updateTravel(id, travel) {
        const updateRq = await connection.execute(
            "UPDATE `travel` SET `destination` = ?, `id_hotel` = ?, `board_type` = ?, `margin` = ?, `reduction` = ? WHERE `travel`.`id_travel` = ?",
            [
                travel.destination,
                travel.id_hotel,
                travel.board_type,
                travel.margin,
                travel.reduction,
                id,
            ]
        );
        return {"affectedRows" : updateRq[0].affectedRows};
    }

    async deleteTravel(id) {
        const deleteRq = await connection.execute(
            "DELETE FROM `travel` WHERE `travel`.`id_travel` = ?",
            [id]
        );
        return {"affectedRows" : deleteRq[0].affectedRows};
    }

    async clearTravels(){
        await connection.execute('DELETE FROM `travel` WHERE 1')
    }
}
