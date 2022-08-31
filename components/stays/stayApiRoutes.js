import express from 'express';
import StayApi from './stayApi.js';

const router = express.Router();
const stayApi = new StayApi();

// get stay by ID
router.get('/:id', stayApi.getById); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// update stay by ID
router.put('/:id', stayApi.updateStay); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// delete stay by ID
router.delete('/:id', stayApi.deleteStay); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// get all stays
router.get('/', stayApi.getAll); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// create stay with post data
router.post('/', stayApi.createStay); //les paramètres req, res sont envoyé automatiquement à la fonction getById

export default router;