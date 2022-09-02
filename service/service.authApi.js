import uuidAPIKey from "uuid-apikey";
import RepoUser from "../components/users/userRepository.js";
import ErrorApi from "./service.errorApi.js";

const repoUser = new RepoUser();

class AuthApi {
    getAuthByApiKey(req, res, next) {
        // Validation format de la clef API
        // Exemple bon format : 1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X
        if (
            typeof req.headers["x-api-key"] == "undefined" ||
            uuidAPIKey.isAPIKey(req.headers["x-api-key"]) !== true
        ) {
            next(
                new ErrorApi("Authentication failed", 401),
                req,
                res,
                next
            );
        }

        // Si la clef est valide, on peut continuer
        repoUser
            .findByUUID(uuidAPIKey.toUUID(req.headers["x-api-key"]))
            .then(() => {
                // On permet d'aller à la suite
                next();
            })
            .catch(() => {
                // On rentre ici car repoUser.findByUUID lève une erreur en cas de résultat vide
                // ce code est capté par le middleware à 4 argument dans routes/api.js
                next(
                    new ErrorApi("Authentication failed", 401),
                    req,
                    res,
                    next
                );
            });
    }
}

export default new AuthApi();
