
import AuthRepository from "../repositories/auth-repository.js";

export default class AuthService {
    loginAsync = async (username, password) => {
        const repo = new AuthRepository();
        const returnObject = await repo.loginAsync(username, password);
        return returnObject;
    }

    createAsync = async (entity) => {
        const repo = new AuthRepository();
        const returnArray = await repo.registerAsync(entity);
        return returnArray;
    }
}
