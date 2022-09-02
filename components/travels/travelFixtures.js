import { faker } from "@faker-js/faker";
import TravelRepository from "./travelRepository.js";

const travelRepository = new TravelRepository();

export default class TravelFixtures {
    async createTravel() {
        const travel = {
            destination: faker.address.cityName(),
            id_hotel: Math.floor(Math.random() * 500) + 1,
            board_type: Math.random() < 0.5 ? "half-stay" : "all-inclusive",
            margin: Math.floor(Math.random() * 20) + 1,
            reduction: Math.floor(Math.random() * 10) + 1,
        };
        let idTravel = await travelRepository.createTravel(travel);

        return Promise.resolve(idTravel);
    }

    async clearTravels(){
        await travelRepository.clearTravels();
    }
}
