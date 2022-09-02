import { faker } from "@faker-js/faker";
import CustomerRepository from "./customerRepository.js";

const customerRepository = new CustomerRepository();

export default class CustomerFixtures {
    async createMainCustomer(userInfos) {
        const firstName = userInfos[1];
        const lastName = userInfos[2];

        const customer = {
            firstname: firstName,
            lastname: lastName,
            birthdate: faker.date
                .between("1950-01-01", "2022-01-01")
                .toISOString()
                .slice(0, 10),
            idUser : userInfos[0]
        };
        let idCustomer = await customerRepository.createCustomer(customer);
        return Promise.resolve(idCustomer);
    }

    async createCompanions() {
        const number = Math.floor(Math.random() * 5);
        let companions = [];
        for (let i = 0; i < number; i++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();

            const customer = {
                firstname: firstName,
                lastname: lastName,
                birthdate: faker.date
                    .between("1950-01-01", "2022-01-01")
                    .toISOString()
                    .slice(0, 10),
                idUser : null
            };
            let idCustomer = await customerRepository.createCustomer(customer);
            companions.push(idCustomer.insertId);
        }

        return Promise.resolve(companions);
    }

    async clearCustomers(){
        await customerRepository.clearCustomers();
    }
}
