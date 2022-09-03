import TravelRepository from "./travelRepository.js";
import data from "../../service/service.dataResponse.js";

const travelRepository = new TravelRepository();

export default class TravelApi {
    /**
     * @api {get} /api/travels Get all travels
     * @apiName getAll
     * @apiGroup Travels
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
     * @apiSuccess {json} result Travels list and pagination infos.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "records": [
     *          {
     *              "id_travel": 1141,
     *              "destination": "Hartford",
     *              "id_hotel": 29,
     *              "board_type": "all-inclusive",
     *              "margin": 16,
     *              "reduction": 1
     *          },
     *          ...
     *              "id_travel": 1149,
     *              "destination": "Saginaw",
     *              "id_hotel": 60,
     *              "board_type": "all-inclusive",
     *              "margin": 8,
     *              "reduction": 6
     *           },
     *           {
     *               "id_travel": 1150,
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
     * @apiSuccess {json} result-empty No travel Found
     * @apiSuccessExample {json} No-Travel-Response:
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
        let page = parseInt(req.query.page) || 1;
        let limit = 10; // nombre d'éléments par page
        let offset = limit * page - limit;

        const result = await travelRepository.getAll(limit, offset);
        if (result.travels.length > 0) {
            return res
                .status(200)
                .send(data(result.travels, page, result.count, limit));
        } else {
            return res.status(200).send(data(result.travels));
        }
    }

    /**
     * @api {get} /api/travels/:id Get one travel
     * @apiName getById
     * @apiGroup Travels
     *
     * @apiParam {Number} id Travel unique ID.
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
     * @apiSuccess {json} result Travel information.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "records": {
     *        "id_travel": 1131,
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
     * @apiError {json} not-found Travel not found.
     * @apiErrorExample {json} Error-Travel-Not-Found-Response:
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
        const result = await travelRepository.getById(req.params.id);
        console.log(result);
        if(result.travel.length > 0){
            return res
                .status(200)
                .send(data(result.travel, page, result.count, limit));
        } else {
            return res
                .status(404)
                .send(data(result.travel, page, result.count, limit));
        }
    }

    /**
     * @api {post} /api/travels/ Create a travel
     * @apiName createTravel
     * @apiGroup Travels
     *
     * @apiBody {String} destination       Travel's destination - must be city or region
     * @apiBody {String} board-type        all-inclusive or half-stay
     * @apiBody {Number} margin
     * @apiBody {Number} reduction
     * @apiParamExample {json} Main-Travel-Example:
     * {
     *  "destination": "Ajaccio",
     *  "id_hotel": "xxx999xxx999",
     *  "board_type": "all-inclusive",
     *  "margin" : 15,
     *  "reduction": 5
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
     * @apiSuccess {json} result Travel created.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 201 OK
     *     {
     *      "insertId": 36340
     *     }
     *
     */
    async createTravel(req, res) {
        const insertId = await travelRepository.createTravel(req.body);
        res.status(200).json(insertId);
    }

    /**
     * @api {put} /api/travels/:id Update a travel
     * @apiName updateTravel
     * @apiGroup Travels
     *
     * @apiParam {Number} id Travel unique ID.
     *
     * @apiBody {String} destination       Travel's destination - must be city or region
     * @apiBody {String} board-type        all-inclusive or half-stay
     * @apiBody {Number} margin
     * @apiBody {Number} reduction
     *
     * @apiParamExample {json} Main-Travel-Example:
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
     * @apiError {json} not-found Travel not found.
     * @apiErrorExample {json} Error-Travel-Not-Found-Response:
     *     HTTP/1.1 404 NOT FOUND
     *     {
     *      "affectedRows": 0
     *     }
     *
     * @apiSuccess {json} result Travel Number of travel updated. Must be 1.
     * @apiSuccessExample {json} Travel-Updated-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "affectedRows": 1
     *     }
     *
     *
     */
    async updateTravel(req, res) {
        const result = await travelRepository.updateTravel(
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
     * @api {delete} /api/travels/:id Delete a travel
     * @apiName deleteTravel
     * @apiGroup Travels
     *
     * @apiParam {Number} id Travel unique ID.
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
     * @apiError {json} not-found Travel not found.
     * @apiErrorExample {json} Error-Travel-Not-Found-Response:
     *     HTTP/1.1 404 NOT FOUND
     *     {
     *      "affectedRows": 0
     *     }
     *
     * @apiSuccess {json} result Travel deleted.
     * @apiSuccessExample {json} Travel-Deleted-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "affectedRows": 1
     *     }
     *
     *
     */
    async deleteTravel(req, res) {
        const result = await travelRepository.deleteTravel(req.params.id);
        if(result.affectedRows === 1){
            return res.status(200).json(result);
        } else {result
            return res.status(404).json(result);
        }
    }
}
