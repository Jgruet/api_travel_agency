import express from 'express';
import UserApi from './userApi.js';
 
const router = express.Router();
const user = new UserApi();
 
// get user By ID
router.get('/:id', user.getUserById);
 
export default router;