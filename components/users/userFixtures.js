import { faker } from "@faker-js/faker";
import UserRepository from "./UserRepository.js";

const userRepository = new UserRepository();

export default class UserFixtures {
    async createUser() {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();

        const user = {
            email  : faker.internet.email(firstName, lastName),
            password : '1234'
        };
        let result = await userRepository.createUser(user);

        let userInfos;
        userInfos = [result.insertId, firstName, lastName]

        return Promise.resolve(userInfos);
    }

    async clearUsers(){
        await userRepository.clearUsers();
    }
}
