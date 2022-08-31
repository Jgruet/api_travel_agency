import dotenv from 'dotenv';
import express from 'express';

const app = express();

// pour permettre le chargement des variables d'environnement
//dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });
dotenv.config();

// permet de parser le contenu du body des requêtes,
// l'option extended true permet de parser les objets
// pour les formulaires
app.use(express.urlencoded({ extended: true }));
 
//--------------------------------------------------------------------
//      Chargement des routes liées à l'API
//--------------------------------------------------------------------
import apiRoutes from './routes/api.js';
app.use('/api', apiRoutes);
 
//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(process.env.PORT,() => {
    console.log(`Le serveur est démarré : http://localhost:${process.env.PORT}`);
});
 
export default app;