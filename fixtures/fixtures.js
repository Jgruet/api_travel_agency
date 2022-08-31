
import CustomerFixtures from "../components/customers/customerFixtures.js";
import TravelFixtures from "../components/travels/travelFixtures.js";
import StayFixtures from "../components/stays/stayFixtures.js";

const customerFixtures = new CustomerFixtures();
const travelFixtures = new TravelFixtures();
const stayFixtures = new StayFixtures();

let stopProcess = [];
for(let i = 0; i < process.argv[2]; i++) {
    let promise = new Promise(async (resolve) => {
        await travelFixtures.createTravel().then(async (idTravel) => {
            await customerFixtures.createCustomer().then(async (idCustomer) => {
                await stayFixtures.createStay(idTravel, idCustomer).then(async (idStay) => {
                    await customerFixtures.createCompanion().then(async (companions) => {
                        companions.push(idCustomer);
                        await stayFixtures.bindCustomers(idStay, companions).then(async () => {
                            await stayFixtures.bindHotelBooking(idCustomer).then(async () => {
                                await stayFixtures.bindFlightBooking(idCustomer).then(() => {
                                    resolve();
                                 });
                            });
                        });
                    });
                });
            });
        });
    })
    stopProcess.push(promise);
}

Promise.all(stopProcess).then(() => { process.exit(); })