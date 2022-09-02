export default class ErrorApi extends Error {
    constructor(msg, code = 400) {
        super(msg);
        this.code = code
    }
}