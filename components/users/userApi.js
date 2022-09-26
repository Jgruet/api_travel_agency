import UserRepository from "./userRepository.js";
import data from "../../service/service.dataResponse.js";
import ErrorApi from "../../service/service.errorApi.js";

const userRepository = new UserRepository();

export default class UserApi {
    /**
     * @api {get} /api/users/ Get all users
     * @apiName getAll
     * @apiGroup Users
     * 
     * @apiParam (Query string) {Number} [page] Page number
     *
     * @apiHeader {String} authorization x-api-key <API_KEY>
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
     *     }
     *
     * @apiError {json} incorrect-api-key API key is not well formed or not bind to existing uuid
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 401 UNAUTHORIZED
     *     {
     *       "message": "Authentication failed",
     *       "code": 401,
     *       "status": "error"
     *      }
     *
     * @apiSuccess {json} result Users list and pagination infos.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "records": [
     *      {
     *          "id_user": 3321,
     *          "uuid": "0b9ca335-92a8-46d8-b477-eb2ed83ac927",
     *          "role": "admin",
     *          "email": "john@doe.com"
     *      },
     *      {
     *          "id_user": 3321,
     *          "uuid": "0b9ca335-92a8-46d8-b477-eb2ed83ac917",
     *          "role": "partner",
     *          "email": "john2@doe.com"
     *      },
     *      {
     *          "id_user": 3321,
     *          "uuid": "0b9ca335-92a8-46d8-b477-eb2ed83ac907",
     *          "role": "public",
     *          "email": "john3@doe.com"
     *      },
     *          ],
     *          "nbRecords": 3071,
     *          "page": {
     *              "current": 2,
     *              "previous": 1,
     *              "next": 3,
     *              "last": 308
     *          }
     *      }
     * @apiSuccess {json} result-empty No user Found
     * @apiSuccessExample {json} No-User-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "records": [],
     *          "nbRecords": 0,
     *          "page": {
     *              "current": 1,
     *              "previous": null,
     *              "next": null,
     *              "last": 0
     *          }
     *      }
     *
     */
    async getAll(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // nombre d'éléments par page
        const offset = limit * page - limit;

        const result = await userRepository.getAll(limit, offset);
        if (result.users.length > 0) {
            return res
                .status(200)
                .send(data(result.users, page, result.count, limit));
        } else {
            return res.status(200).send(data(result.users));
        }
    }

    /**
     * @api {get} /api/users/:id Get one user
     * @apiName getById
     * @apiGroup Users
     *
     * @apiParam {Number} id User unique ID.
     *
     * @apiHeader {String} authorization x-api-key <API_KEY>
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
     *     }
     *
     * @apiError {json} incorrect-api-key API key is not well formed or not bind to existing uuid
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 401 UNAUTHORIZED
     *     {
     *       "message": "Authentication failed",
     *       "code": 401,
     *       "status": "error"
     *      }
     *
     * @apiSuccess {json} data User information.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "records": [
     *       {
     *          "id_user": 3321,
     *          "uuid": "0b9ca335-92a8-46d8-b477-eb2ed83ac927",
     *          "role": "admin",
     *          "email": "john@doe.com"
     *      },
     *      ],
     *        "nbRecords": 3071,
     *         "page": {
     *             "current": 2,
     *             "previous": 1,
     *             "next": 3,
     *             "last": 308
     *         }
     *     }
     * @apiError {json} Travel Not Found
     * @apiErrorExample {json} Error-No-User-Found-Response:
     *     HTTP/1.1 404 NOT FOUND
     *     {
     *      "records": [],
     *          "nbRecords": 0,
     *          "page": {
     *              "current": 0,
     *              "previous": null,
     *              "next": null,
     *              "last": 0
     *          }
     *      }
     *
     */
    async getById(req, res) {
        const page = 0;
        const limit = 10; // nombre d'éléments par page
        const result = await userRepository.getById(req.params.id);
        if(result.user.length > 0){
            return res
                .status(200)
                .send(data(result.user, page, result.count, limit));
        } else {
            return res
                .status(404)
                .send(data(result.user, page, result.count, limit));
        }
    }

    /**
     * @api {post} /api/users/ Create a user
     * @apiName createUser
     * @apiGroup Users
     *
     * @apiBody {String} email       User's email
     * @apiBody {String} password          User's password.
     * @apiParamExample {json} User-Example:
     * {
     *  "email": "john@doe.com",
     *  "password": "p4ssw0rd"
     * }
     *
     * @apiHeader {String} authorization x-api-key <API_KEY>
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
     *     }
     *
     * @apiError {json} incorrect-api-key API key is not well formed or not bind to existing uuid
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 401 UNAUTHORIZED
     *     {
     *       "message": "Authentication failed",
     *       "code": 401,
     *       "status": "error"
     *      }
     *
     * @apiError {json} user-id-not-available User id already taken
     * @apiErrorExample {json} Error-User-ID-Response:
     *     HTTP/1.1 400 BAD REQUEST
     *     {
     *         "message": "User id not avaible",
     *          "code": 400,
     *          "status": "error"
     *     }
     * 
     * @apiSuccess {json} result User created.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 201 OK
     *     {
     *      "insertId": 36340
     *     }
     *
     */
    async createUser(req, res, next) {
        const result = await userRepository.createUser(req.body);
        if(result.SQLError != ""){
            next(
                new ErrorApi(result.SQLError, 400),
                req,
                res,
                next
            );
        } else {
            res.status(200).json(result);
        }
    }

    /**
     * @api {put} /api/users/:id Update a user
     * @apiName updateUser
     * @apiGroup Users
     *
     * @apiParam {Number} id User unique ID.
     *
     * @apiBody {String} uudi       User's uuid
     * @apiBody {String} role          User's role.
     * @apiBody {String} email          User's email.
     * @apiBody {password} [password]          User's password. Let empty to not modify
     * 
     * @apiParamExample {json} Request-Example:
     * {
     *  "email": "john@doe.com",
     *  "password": "p4ssw0rd",
     *  "uuid" : 0b9ca335-92a8-46d8-b477-eb2ed83ac947
     * }
     * 
     * 
     *
     * @apiHeader {String} authorization x-api-key <API_KEY>
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
     *     }
     *
     * @apiError {json} incorrect-api-key API key is not well formed or not bind to existing uuid.
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 401 UNAUTHORIZED
     *     {
     *       "message": "Authentication failed",
     *       "code": 401,
     *       "status": "error"
     *      }
     *
     * @apiError {json} not-found User not found.
     * @apiErrorExample {json} Error-User-Not-Found-Response:
     *     HTTP/1.1 404 NOT FOUND
     *     {
     *      "affectedRows": 0
     *     }
     *
     * @apiSuccess {json} result User Number of user updated. Must be 1.
     * @apiSuccessExample {json} User-Updated-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "affectedRows": 1
     *     }
     *
     *
     */
    async updateUser(req, res) {
        const result = await userRepository.updateUser(
            req.params.id,
            req.body
        );
        if(result.affectedRows === 1){
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    }

    /**
     * @api {delete} /api/users/:id Delete a user
     * @apiName deleteUser
     * @apiGroup Users
     *
     * @apiParam {Number} id User unique ID.
     *
     *
     * @apiHeader {String} authorization x-api-key <API_KEY>
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
     *     }
     *
     * @apiError {json} incorrect-api-key API key is not well formed or not bind to existing uuid.
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 401 UNAUTHORIZED
     *     {
     *       "message": "Authentication failed",
     *       "code": 401,
     *       "status": "error"
     *      }
     *
     * @apiError {json} not-found User not found.
     * @apiErrorExample {json} Error-User-Not-Found-Response:
     *     HTTP/1.1 404 NOT FOUND
     *     {
     *      "affectedRows": 0
     *     }
     *
     * @apiSuccess {json} result User deleted.
     * @apiSuccessExample {json} User-Deleted-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "affectedRows": 1
     *     }
     *
     *
     */
    async deleteUser(req, res) {
        const result = await userRepository.deleteUser(
            req.params.id
        );
        if(result.affectedRows === 1){
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    }

    /**
     * @api {post} /api/users/connect Connect a user
     * @apiName connectUser
     * @apiGroup Users
     *
     * @apiBody {String} email       User's email
     * @apiBody {String} password          User's password.
     * @apiParamExample {json} User-Example:
     * {
     *  "email": "john@doe.com",
     *  "password": "p4ssw0rd"
     * }
     *
     * @apiHeader {String} authorization x-api-key <API_KEY>
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
     *     }
     *
     * @apiError {json} incorrect-api-key API key is not well formed or not bind to existing uuid.
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 401 UNAUTHORIZED
     *     {
     *       "message": "Authentication failed",
     *       "code": 401,
     *       "status": "error"
     *      }
     *
     * @apiError {json} not-found User not found.
     * @apiErrorExample {json} Error-User-Not-Found-Response:
     *     HTTP/1.1 404 NOT FOUND
     *     {
     *       "message": "Utilisateur inconnu",
     *       "code": 404,
     *       "status": "error"
     *     }
     *
     * @apiSuccess {json} result Good credentials.
     * @apiSuccessExample {json} Good-Credentials-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id_user": 74,
     *       "uuid": "1acf7842-e35f-4e27-b6f5-800e7f68b20c",
     *       "role": "public",
     *       "email": "john@doe.com"
     *     }
     *
     *
     */
    async connectUser(req, res, next) {
        const result = await userRepository.connectUser(
            req.body.email,
            req.body.password
        )
        if(result.errorMsg){
            next(
                new ErrorApi(result.errorMsg, 404),
                req,
                res,
                next
            );
        } else {
            return res.status(200).json(result);
        }
        //TO DO : inscrire les infos en session client
    }
}