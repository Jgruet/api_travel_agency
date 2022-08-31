import { faker } from "@faker-js/faker";
import StayRepository from "./stayRepository.js";

const stayRepository = new StayRepository();

export default class StayFixtures {
    async createStay(idTravel, idCustomer) {
        const star_at = faker.date
            .soon(Math.floor(Math.random() * 100))
            .toISOString()
            .slice(0, 10);
        const end_at = faker.date
            .soon(Math.floor(Math.random() * 20) + 1, star_at)
            .toISOString()
            .slice(0, 10);

        const stay = {
            id_travel: idTravel,
            start_at: star_at,
            end_at: end_at,
            id_main_customer: idCustomer,
        };
        let idStay = await stayRepository.createStay(stay);

        return Promise.resolve(idStay);
    }

    async bindCustomers(idStay, idCustomers) {
        await stayRepository.bindCustomers(idStay, idCustomers);

        return Promise.resolve();
    }

    async bindFlightBooking(idCustomer) {
        const idFlight = Math.floor(Math.random() * 100);
        return await stayRepository.bindFlightBooking(idCustomer, idFlight);
    }

    async bindHotelBooking(idCustomer) {
        const idHotel = Math.floor(Math.random() * 100);
        return await stayRepository.bindHotelBooking(idCustomer, idHotel);
    }
}
