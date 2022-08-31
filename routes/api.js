import express from 'express';
import apiCustomersRoutes from '../components/customers/customerApiRoutes.js';

const router = express.Router();

// pour traiter les json
router.use(express.json());

// Appel de mes routes customers pour l'api
router.use('/customers', apiCustomersRoutes);
// ... chargement de vos prochaines routes ici
 
router.route("/test").all((req,res) => { res.status(200).json({"test": "test"}); });

// Si une route n'existe pas, erreur 404
router.route("*").all((req,res) => { res.status(404).send(); });
 
export default router;