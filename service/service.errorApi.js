// Service qui sert à homogénéiser les messages d'erreur sur l'application
export default class ErrorApi extends Error {
    constructor(msg, code = 400) {
        super(msg);
        this.code = code
    }
}