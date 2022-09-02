import express from "express";
import UserApi from "./userApi.js";

const router = express.Router();
const userApi = new UserApi();

// connect user
router.post("/connect", userApi.connectUser);

// get user by ID
router.get("/:id", userApi.getById); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// update user by ID
router.put("/:id", userApi.updateUser); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// delete user by ID
router.delete("/:id", userApi.deleteUser); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// get all users
router.get("/", userApi.getAll); //les paramètres req, res sont envoyé automatiquement à la fonction getById

// create user with post data
router.post("/", userApi.createUser); //les paramètres req, res sont envoyé automatiquement à la fonction getById

export default router;
