import express from 'express';
import apiCustomersRoutes from '../components/customers/customerApiRoutes.js';
import apiTravelsRoutes from '../components/travels/travelApiRoutes.js';
import apiStaysRoutes from '../components/stays/stayApiRoutes.js';
import apiUsersRoutes from '../components/users/userApiRoutes.js';
import serviceAuth from '../service/service.authApi.js';

const router = express.Router();

// pour traiter les json
router.use(express.json());

// Gestion des droits API
router.use('/', serviceAuth.getAuthByApiKey);

// Appel de mes routes customers pour l'api
router.use('/customers', apiCustomersRoutes);
// Appel de mes routes customers pour l'api
router.use('/travels', apiTravelsRoutes);
// Appel de mes routes customers pour l'api
router.use('/stays', apiStaysRoutes);
// Appel de mes routes users pour l'API
router.use('/users', apiUsersRoutes);
 
router.use((error, req, res, next) => {
    res.status(error.code || 400).json({message: error.message, code:error.code, status:'error'})
})

router.route("/test").all((req,res) => { res.status(200).json({"test": "test"}); });

// Si une route n'existe pas, erreur 404
router.route("*").all((req,res) => { res.status(404).send(); });
 
export default router;