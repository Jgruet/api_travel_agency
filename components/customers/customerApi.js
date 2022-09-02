import CustomerRepository from "./customerRepository.js";
import data from "../../service/service.dataResponse.js";

const customerRepository = new CustomerRepository();

export default class CustomerApi {
    /**
     * @api {get} /api/customers/ Get all customers
     * @apiName getAll
     * @apiGroup Customers
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
     * @apiSuccess {json} result Customers list and pagination infos.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "records": [
     *      {
     *          "id_customer": 3321,
     *          "firstname": "Rodrick",
     *          "lastname": "Corkery",
     *          "birthdate": "1982-07-31T22:00:00.000Z"
     *          "email": "Polly_Kuhic70@gmail.com",
     *          "is_companion": 0
     *      },
     *      {
     *          "id_customer": 3580,
     *          "firstname": "Braulio",
     *          "lastname": "Okuneva",
     *          "birthdate": "1982-07-31T22:00:00.000Z"
     *          "email": "",
     *          "is_companion": 1,
     *      },
     *      {
     *      {
     *          "id_customer": 33422,
     *          "firstname": "Preston",
     *          "lastname": "Mosciski",
     *          "birthdate": "1998-08-31T22:00:00.000Z"
     *          "email": "",
     *          "is_companion": 1,s
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
     * @apiSuccess {json} result-empty No customer Found
     * @apiSuccessExample {json} No-Customer-Response:
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

        const result = await customerRepository.getAll(limit, offset);
        if (result.customers.length > 0) {
            return res
                .status(200)
                .send(data(result.customers, page, result.count, limit));
        } else {
            return res.status(200).send(data(result.customers));
        }
    }

    /**
     * @api {get} /api/customers/:id Get one customer
     * @apiName getById
     * @apiGroup Customers
     *
     * @apiParam {Number} id Customer unique ID.
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
     * @apiSuccess {json} data Customer information.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "records": [
     *       {
     *           "id_customer": 3321,
     *           "firstname": "Rodrick",
     *           "lastname": "Corkery",
     *           "birthdate": "1982-07-31T22:00:00.000Z"
     *           "email": "Polly_Kuhic70@gmail.com",
     *           "is_companion": 0
     *       },
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
     * @apiErrorExample {json} Error-No-Customer-Found-Response:
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
        const result = await customerRepository.getById(req.params.id);
        if(result.customer.length > 0){
            return res
                .status(200)
                .send(data(result.customer, page, result.count, limit));
        } else {
            return res
                .status(404)
                .send(data(result.customer, page, result.count, limit));
        }
    }

    /**
     * @api {post} /api/customers/ Create a customer
     * @apiName createCustomer
     * @apiGroup Customers
     *
     * @apiBody {String} firstname       Customer's firstname
     * @apiBody {String} lastname          Customer's lastname.
     * @apiBody {Date} birthdate          Customer's birthdate.
     * @apiBody {String} [email]          Customer's email. Necessary if you want to create a main customer, not necessary for a companion.
     * @apiBody {Boolean} [isCompanion]    If = 1, customer is considered as companion.
     * @apiParamExample {json} Main-Customer-Example:
     * {
     *  "firstname": "Stéphane",
     *  "lastname": "Montané",
     *  "birthdate": "1992-01-19",
     *  "email" : "steph1992@gmail.com",
     *  "isCompanion": 0
     *  }
     * @apiParamExample {json} Companion-Example:
     * {
     *  "firstname": "Stéphane",
     *  "lastname": "Montané",
     *  "birthdate": "1992-01-19",
     *  "isCompanion": 1
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
     * @apiSuccess {json} result Customer created.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 201 OK
     *     {
     *      "insertId": 36340
     *     }
     *
     */
    async createCustomer(req, res) {
        const insertId = await customerRepository.createCustomer(req.body);
        res.status(200).json(insertId);
    }

    /**
     * @api {put} /api/customers/:id Update a customer
     * @apiName updateCustomer
     * @apiGroup Customers
     *
     * @apiParam {Number} id Customer unique ID.
     *
     * @apiBody {String} firstname       Customer's firstname
     * @apiBody {String} lastname          Customer's lastname.
     * @apiBody {Date} birthdate          Customer's birthdate.
     * @apiBody {String} [email]          Customer's email. Necessary if you want to create a main customer, not necessary for a companion.
     * @apiBody {Boolean} [isCompanion]    If = 1, customer is considered as companion.
     * 
     * @apiParamExample {json} Request-Example:
     * {
     *  "firstname": "Stéphane",
     *  "lastname": "Montané",
     *  "birthdate": "1992-01-19",
     *  "isCompanion": 1
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
     * @apiError {json} not-found Customer not found.
     * @apiErrorExample {json} Error-Customer-Not-Found-Response:
     *     HTTP/1.1 404 NOT FOUND
     *     {
     *      "affectedRows": 0
     *     }
     *
     * @apiSuccess {json} result Customer Number of customer updated. Must be 1.
     * @apiSuccessExample {json} Customer-Updated-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "affectedRows": 1
     *     }
     *
     *
     */
    async updateCustomer(req, res) {
        const result = await customerRepository.updateCustomer(
            req.params.id,
            req.body
        );
        if(result.affectedRows === 1){
            return res.status(200).json(affectedRow);
        } else {
            return res.status(404).json(affectedRow);
        }
    }

    /**
     * @api {delete} /api/customers/:id Delete a customer
     * @apiName deleteCustomer
     * @apiGroup Customers
     *
     * @apiParam {Number} id Customer unique ID.
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
     * @apiError {json} not-found Customer not found.
     * @apiErrorExample {json} Error-Customer-Not-Found-Response:
     *     HTTP/1.1 404 NOT FOUND
     *     {
     *      "affectedRows": 0
     *     }
     *
     * @apiSuccess {json} result Customer deleted.
     * @apiSuccessExample {json} Customer-Deleted-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "affectedRows": 1
     *     }
     *
     *
     */
    async deleteCustomer(req, res) {
        const result = await customerRepository.deleteCustomer(
            req.params.id
        );
        if(result.affectedRows === 1){
            return res.status(200).json(affectedRow);
        } else {
            return res.status(404).json(affectedRow);
        }
    }

    /**
     * @api {get} /api/customers/stay-dates?from=:from&to=:to Get customers info. by holiday period
     * @apiName getCustomersByHolydayPeriod
     * @apiGroup Customers
     *
     * @apiParam (Query string) {date} from Date from. Format : 2022-09-03
     * @apiParam (Query string) {date} to Date to. Format : 2022-10-03
     * @apiParam (Query string) {int} [page] Page number
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
     * @apiSuccess {json} result Customers list and pagination.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "records": [
     *      {
     *          "id_customer": 3580,
     *          "email": "Polly_Kuhic70@gmail.com",
     *          "id_travel": 1161,
     *          "start_at": "2022-10-12T22:00:00.000Z",
     *          "end_at": "2022-10-16T22:00:00.000Z"
     *      },
     *      {
     *          "id_customer": 3588,
     *          "email": "Milan_Crona@gmail.com",
     *          "id_travel": 1163,
     *          "start_at": "2022-10-21T22:00:00.000Z",
     *          "end_at": "2022-10-27T22:00:00.000Z"
     *      },
     *      {
     *          "id_customer": 3591,
     *          "email": "Juwan_Herzog44@yahoo.com",
     *          "id_travel": 1164,
     *          "start_at": "2022-10-03T22:00:00.000Z",
     *          "end_at": "2022-10-03T22:00:00.000Z"
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
     * @apiSuccess {json} result-empty No customer for give period
     * @apiSuccessExample {json} No-Customer-Response:
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
    async getCustomersByHolydayPeriod(req, res) {
        const from = req.query.from;
        const to = req.query.to;
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // nombre d'éléments par page
        const offset = limit * page - limit;

        const result = await customerRepository.getCustomersByHolydayPeriod(
            from,
            to,
            limit,
            offset
        );
        if (result.customers.length > 0) {
            return res
                .status(200)
                .send(data(result.customers, page, result.count, limit));
        } else {
            return res.status(200).send(data(result.customers));
        }
    }

    /**
     * @api {get} /api/customers/hotel-booking/:id Get customers info. by hotel booking
     * @apiName getCustomerInfoByHotelBooking
     * @apiGroup Customers
     *
     * @apiParam (Query string) {Number} [page] Page number
     * @apiParam {Number} id Customer unique ID.
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
     * @apiSuccess {json} result Customer list.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *      {
     *        "records": [
     *          {
     *           "id_stay": 11123,
     *           "firstname": "Brenden",
     *           "lastname": "Heathcote",
     *           "email": "Brenden_Heathcote@yahoo.com"
     *          },
     *          {
     *           "id_stay": 11123,
     *           "firstname": "Kara",
     *           "lastname": "Anderson",
     *            "email": ""
     *           },
     *           {
     *            "id_stay": 11123,
     *            "firstname": "Hilda",
     *            "lastname": "Hudson",
     *            "email": ""
     *           }
     *          ],
     *          "nbRecords": 3,
     *          "page": {
     *            "current": 1,
     *            "previous": null,
     *            "next": null,
     *            "last": 1
     *         }
     *     }
     * @apiError {json} not-found Customer not found.
     * @apiErrorExample {json} Error-Customer-Not-Found-Response:
     *     HTTP/1.1 404 NOT FOUND
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
    async getCustomerInfoByHotelBooking(req, res) {
        const id_booking = req.params.id;
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // nombre d'éléments par page
        const offset = limit * page - limit;
        const result = await customerRepository.getCustomerInfoByHotelBooking(
            id_booking,
            limit,
            offset
        );
        return res
            .status(200)
            .send(data(result.customers, page, result.count, limit));
    }

    /**
     * @api {get} /api/customers/plane-booking/:id Get customers info. by plane booking
     * @apiName getCustomerInfoByPlaneBooking
     * @apiGroup Customers
     *
     * @apiParam (Query string) {date} [page] Page number
     * @apiParam {Number} id Customer unique ID.
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
     * @apiSuccess {json} result Customers list and pagination.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *      {
     *        "records": [
     *          {
     *           "id_stay": 11123,
     *           "firstname": "Brenden",
     *           "lastname": "Heathcote",
     *           "email": "Brenden_Heathcote@yahoo.com"
     *          },
     *          {
     *           "id_stay": 11123,
     *           "firstname": "Kara",
     *           "lastname": "Anderson",
     *            "email": ""
     *           },
     *           {
     *            "id_stay": 11123,
     *            "firstname": "Hilda",
     *            "lastname": "Hudson",
     *            "email": ""
     *           }
     *          ],
     *          "nbRecords": 3,
     *          "page": {
     *            "current": 1,
     *            "previous": null,
     *            "next": null,
     *            "last": 1
     *         }
     *     }
     * @apiError {json} not-found Customer not Found
     * @apiErrorExample {json} Error-Customer-Not-Found-Response:
     *     HTTP/1.1 404 NOT FOUND
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
    async getCustomerInfoByPlaneBooking(req, res) {
        const id_booking = req.params.id;
        console.log(id_booking);
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // nombre d'éléments par page
        const offset = limit * page - limit;
        const result = await customerRepository.getCustomerInfoByPlaneBooking(
            id_booking,
            limit,
            offset
        );
        return res
            .status(200)
            .send(data(result.customers, page, result.count, limit));
    }
}
