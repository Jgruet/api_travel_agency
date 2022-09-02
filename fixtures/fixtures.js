import CustomerFixtures from "../components/customers/customerFixtures.js";
import TravelFixtures from "../components/travels/travelFixtures.js";
import StayFixtures from "../components/stays/stayFixtures.js";

const customerFixtures = new CustomerFixtures();
const travelFixtures = new TravelFixtures();
const stayFixtures = new StayFixtures();

async function clearDatabase(){
    await customerFixtures.clearCustomers();
    await travelFixtures.clearTravels();
}

async function runFixtures(num = 1)
{
    if(num === 1){
        await clearDatabase();
    }
    let idTravel = await travelFixtures.createTravel();
    let idCustomer = await customerFixtures.createCustomer();
    let idStay = await stayFixtures.createStay(idTravel, idCustomer);
    let companions = await customerFixtures.createCompanion();
    companions.push(idCustomer);
    await stayFixtures.bindCustomers(idStay, companions);
    await stayFixtures.bindHotelBooking(idCustomer);
    await stayFixtures.bindFlightBooking(idCustomer);

    if(num >= process.argv[2]) {
        process.exit();
    } else {
        num++;
        runFixtures(num);
    }
}
runFixtures();