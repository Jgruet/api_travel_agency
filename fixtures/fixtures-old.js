import readLine from "readline";
import CustomerFixtures from "../components/customers/customerFixtures.js";
import TravelFixtures from "../components/travels/travelFixtures.js";
import StayFixtures from "../components/stays/stayFixtures.js";

const customerFixtures = new CustomerFixtures();
const travelFixtures = new TravelFixtures();
const stayFixtures = new StayFixtures();

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("You will load fixtures into database. Are you sure ? Y/N \n", (response) => {

    if(response === 'Y' || response === 'y'){

        travelFixtures.createTravel().then((idTravel) => {
            customerFixtures.createCustomer().then((idCustomer) => {
                stayFixtures.createStay(idTravel, idCustomer).then((idStay) => {
                    customerFixtures.createCompanion(idStay).then((companions) => {
                        companions.push(idCustomer);
                        stayFixtures.bindCustomers(idStay, companions).then(() => {
                            stayFixtures.bindHotelBooking(idCustomer).then(() => {
                                stayFixtures.bindFlightBooking(idCustomer).then(() => {
                                    process.exit();
                                });
                            });
                        });
                    });
                });
            });
        });
    } else if(response === 'N' || response === 'n'){
        console.log("EXIT")
        process.exit();
    }
    
});

// Procesus de création de fixtures : 1 itération ...
// Créer 1 travel
// Créer 1 customer non companion
// Créer 1 stay
// Créer 0 ou plusieurs customer companion
// Lier le(s) customer(s) créé(s) au stay
// Créer des booking et les lier au customer non companion
