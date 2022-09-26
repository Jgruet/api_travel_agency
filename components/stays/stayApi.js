import StayRepository from "./stayRepository.js";
import data from "../../service/service.dataResponse.js";
import ErrorApi from "../../service/service.errorApi.js";

const stayRepository = new StayRepository();

export default class StayApi {
    /**
     * @api {get} /api/stays Get all stays
     * @apiName getAll
     * @apiGroup Stays
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
     * @apiSuccess {json} result Stays list and pagination infos.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "records": [
     *          {
     *              "id_stay": 1141,
     *              "destination": "Hartford",
     *              "id_hotel": 29,
     *              "board_type": "all-inclusive",
     *              "margin": 16,
     *              "reduction": 1
     *          },
     *          ...
     *              "id_stay": 1149,
     *              "destination": "Saginaw",
     *              "id_hotel": 60,
     *              "board_type": "all-inclusive",
     *              "margin": 8,
     *              "reduction": 6
     *           },
     *           {
     *               "id_stay": 1150,
     *               "destination": "Country Club",
     *               "id_hotel": 81,
     *               "board_type": "all-inclusive",
     *               "margin": 10,
     *               "reduction": 2
     *           }
     *       ],
     *       "nbRecords": 10000,
     *       "page": {
     *           "current": 2,
     *           "previous": 1,
     *           "next": 3,
     *           "last": 1000
     *       }
     *     }
     * @apiSuccess {json} result-empty No stay Found
     * @apiSuccessExample {json} No-Stay-Response:
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

        const result = await stayRepository.getAll(limit, offset);
        if (result.stays.length > 0) {
            return res
                .status(200)
                .send(data(result.stays, page, result.count, limit));
        } else {
            return res.status(200).send(data(result.stays));
        }
    }

    /**
     * @api {get} /api/stays/:id Get one stay
     * @apiName getById
     * @apiGroup Stays
     *
     * @apiParam {Number} id Stay unique ID.
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
     * @apiSuccess {json} result Stay information.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "records": {
     *        "id_stay": 1131,
     *        "destination": "Escondido",
     *        "id_hotel": 44,
     *        "board_type": "all-inclusive",
     *        "margin": 15,
     *        "reduction": 10
     *      },
     *      "nbRecords": 1,
     *      "page": {
     *          "current": 1,
     *          "previous": null,
     *          "next": null,
     *          "last": 1
     *      }
     *    }
     *
     * @apiError {json} not-found Stay not found.
     * @apiErrorExample {json} Error-Stay-Not-Found-Response:
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
        const result = await stayRepository.getById(req.params.id);
        if (result.stay.length > 0) {
            return res
                .status(200)
                .send(data(result.stay, page, result.count, limit));
        } else {
            return res
                .status(404)
                .send(data(result.stay, page, result.count, limit));
        }
    }

    /**
     * @api {post} /api/stays/ Create a stay
     * @apiName createStay
     * @apiGroup Stays
     *
     * @apiBody {String} id_travel        Travel id
     * @apiBody {Date} start_at         Stay's begin
     * @apiBody {Date} end_at           Stay's end
     * @apiBody {Number} id_main_customer         Main customer identifier
     * @apiParamExample {json} Stay-Example:
     * {
     *  "id_travel": "12345",
     *  "start_at": "2022-09-01",
     *  "end_at" : '"2022-09-21',
     *  "id_main_customer": 5
     *  }
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
     * @apiError {json} customer-not-found id_main_customer does not match with existing customer
     * @apiErrorExample {json} Error-Customer-Not-Found-Response:
     *     HTTP/1.1 404 NOT FOUND
     *     {
     *       "SQLError": "Specified customer does not exist"
     *     }
     *
     * @apiSuccess {json} result Stay created.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 201 OK
     *     {
     *      "insertId": 36340
     *     }
     *
     */
    async createStay(req, res, next) {
        const result = await stayRepository.createStay(req.body);
        if (result.SQLError != "") {
            //res.status(404).json(result);
            next(new ErrorApi(result.SQLError, 404), req, res, next);
        } else {
            res.status(200).json(result);
        }
    }

    /**
     * @api {put} /api/stays/:id Update a stay
     * @apiName updateStay
     * @apiGroup Stays
     *
     * @apiParam {Number} id Stay unique ID.
     *
     * @apiBody {String} destination       Stay's destination - must be city or region
     * @apiBody {String} board-type        all-inclusive or half-stay
     * @apiBody {Number} margin
     * @apiBody {Number} reduction
     *
     * @apiParamExample {json} Main-Stay-Example:
     * {
     *  "destination": "Ajaccio",
     *  "id_hotel": "xxx999xxx999",
     *  "board_type": "all-inclusive",
     *  "margin" : 15,
     *  "reduction": 5
     *  }
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
     * @apiError {json} not-found Stay not found.
     * @apiErrorExample {json} Error-Stay-Not-Found-Response:
     *     HTTP/1.1 404 NOT FOUND
     *     {
     *      "affectedRows": 0
     *     }
     *
     * @apiSuccess {json} result Stay Number of stay updated. Must be 1.
     * @apiSuccessExample {json} Stay-Updated-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "affectedRows": 1
     *     }
     *
     *
     */
    async updateStay(req, res) {
        const result = await stayRepository.updateStay(req.params.id, req.body);
        if (result.affectedRows === 1) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    }
    /**
     * @api {delete} /api/stays/:id Delete a stay
     * @apiName deleteStay
     * @apiGroup Stays
     *
     * @apiParam {Number} id Stay unique ID.
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
     * @apiError {json} not-found Stay not found.
     * @apiErrorExample {json} Error-Stay-Not-Found-Response:
     *     HTTP/1.1 404 NOT FOUND
     *     {
     *      "affectedRows": 0
     *     }
     *
     * @apiSuccess {json} result Stay deleted.
     * @apiSuccessExample {json} Stay-Deleted-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "affectedRows": 1
     *     }
     *
     *
     */
    async deleteStay(req, res) {
        const result = await stayRepository.deleteStay(req.params.id);
        if (result.affectedRows === 1) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    }
}
