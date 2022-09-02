import connection from "../../config/db.js";
import bcrypt from "bcrypt";
import uuidAPIKey from "uuid-apikey";

export default class UserRepository {
    async getAll(limit, offset) {
        const [count] = await connection.execute(
            `SELECT COUNT(id_user) as total FROM user`
        );
        const [rows] = await connection.execute(`SELECT * FROM user LIMIT ? OFFSET ?`, [limit, offset]);
        let result = {};
        result.count = count[0].total;
        result.users = rows;
        return result;
    }

    async getById(id) {
        const [count] = await connection.execute(
            `SELECT COUNT(id_user) as total FROM user WHERE id_user = ?`, [id]
        );
        const [rows] = await connection.execute(
            "SELECT * FROM `user` WHERE `id_user` = ?",
            [id]
        );
        let result = {};
        result.count = count[0].total;
        result.user = rows;
        return result;
    }

    async createUser(user) {
        console.log(user);
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        user.password = await bcrypt.hash(user.password, salt);
        // set uuid to new user
        user.uuid = uuidAPIKey.create().uuid;
        // set default role
        user.role = 'public';
        const insertRq = await connection.execute(
            "INSERT INTO `user` (`uuid`, `email`, `password`, `role`) VALUES (?, ?, ?, ?)",
            [
                user.uuid,
                user.email,
                user.password,
                user.role
            ]
        );
        return {"insertId" : insertRq[0].insertId};
    }

    async updateUser(id, user) {
        const updateRq = await connection.execute(
            "UPDATE `user` SET `uuid` = ?, `email` = ?, `password` = ?, `role` = ? WHERE `user`.`id_user` = ?",
            [
                user.uuid,
                user.email,
                user.password,
                user.role,
                id,
            ]
        );
        return {"affectedRows" : updateRq[0].affectedRows};
    
    }

    async deleteUser(id) {
        const deleteRq = await connection.execute(
            "DELETE FROM `user` WHERE `user`.`id_user` = ?",
            [id]
        );
        return {"affectedRows" : deleteRq[0].affectedRows};
    }

    /* async selectById(id) {
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
    } */

    async findByUUID(uuid) {
        const result = await connection.execute("SELECT * FROM user WHERE uuid=?", [uuid]);
        if(result[0].length === 0)  throw new Error;        
    }

    async connectUser(email, password) {
        const [result] = await connection.execute("SELECT * FROM user WHERE email= ?", [email]);
        if (bcrypt.compareSync(password, result[0].password)) {
            delete result[0].password;
            return result[0];
        }
    }

    async clearUsers() {
        await connection.execute('DELETE FROM `user` WHERE 1');
    }
}
