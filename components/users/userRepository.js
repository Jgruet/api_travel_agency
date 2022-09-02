import connection from "../../config/db.js";

export default class userRepository {
    async selectById(id) {
        const [rows] = await connection.execute(
            "SELECT * FROM user WHERE id_user=?",
            [id]
        );
        if (
            typeof rows[0] != "undefined" &&
            typeof rows[0].password != "undefined"
        ) {
            delete rows[0].password; // on n'enverra jamais le password
            return rows[0];
        }
        return {};
    }

    async findByUUID(uuid) {
        const result = await connection.execute("SELECT * FROM user WHERE uuid=?", [uuid]);
        if(result[0].length === 0)  throw new Error;        
    }
}
