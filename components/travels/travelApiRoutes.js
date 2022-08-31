import express from 'express';
import TravelApi from './travelApi.js';

const router = express.Router();
const travelApi = new TravelApi();

// get travel by ID
router.get('/:id', travelApi.getById); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// update travel by ID
router.put('/:id', travelApi.updateTravel); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// delete travel by ID
router.delete('/:id', travelApi.deleteTravel); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// get all travels
router.get('/', travelApi.getAll); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// create travel with post data
router.post('/', travelApi.createTravel); //les paramètres req, res sont envoyé automatiquement à la fonction getById

export default router;