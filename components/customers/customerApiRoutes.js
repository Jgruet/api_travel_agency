import express from 'express';
import CustomerApi from './customerApi.js';

const router = express.Router();
const customerApi = new CustomerApi();

// get customers by holyday period
router.get('/stay-dates', customerApi.getCustomersByHolydayPeriod); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// get customers by holyday period
router.get('/hotel-booking/:id', customerApi.getCustomerInfoByHotelBooking); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// get customers by holyday period
router.get('/plane-booking/:id', customerApi.getCustomerInfoByPlaneBooking); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// get customer by ID
router.get('/:id', customerApi.getById); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// update customer by ID
router.put('/:id', customerApi.updateCustomer); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// delete customer by ID
router.delete('/:id', customerApi.deleteCustomer); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// get all customers
router.get('/', customerApi.getAll); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// create customer with post data
router.post('/', customerApi.createCustomer); //les paramètres req, res sont envoyé automatiquement à la fonction getById

export default router;