import CustomerFixtures from "../components/customers/customerFixtures.js";
import TravelFixtures from "../components/travels/travelFixtures.js";
import StayFixtures from "../components/stays/stayFixtures.js";
import UserFixtures from "../components/users/userFixtures.js";

const customerFixtures = new CustomerFixtures();
const travelFixtures = new TravelFixtures();
const stayFixtures = new StayFixtures();
const userFixtures = new UserFixtures();

async function clearDatabase(){
    await customerFixtures.clearCustomers();
    await travelFixtures.clearTravels();
    await userFixtures.clearUsers();
}

async function runFixtures(num = 1)
{
    if(num === 1){
        await clearDatabase();
    }

    let idTravel = await travelFixtures.createTravel(); // return [idTravel, idHotel]
    //console.log(1);
    let userInfos = await userFixtures.createUser();
    //console.log(2);
    let idCustomer = await customerFixtures.createMainCustomer(userInfos);
    //console.log(3);
    let idStay = await stayFixtures.createStay(idTravel.insertId, idCustomer.insertId);
    //console.log(4);
    let companions = await customerFixtures.createCompanions();
    //console.log(5);
    companions.push(idCustomer.insertId);
    //console.log(6);
    await stayFixtures.bindCustomers(idStay.insertId, companions);
    //console.log(7);
    await stayFixtures.bindHotelBooking(idCustomer.insertId);
    //console.log(8);
    await stayFixtures.bindFlightBooking(idCustomer.insertId);
    //console.log(9);

    if(num >= process.argv[2]) {
        process.exit();
    } else {
        num++;
        runFixtures(num);
    }
}
runFixtures();