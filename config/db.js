import mysql from 'mysql2/promise';

// create the connection to database
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'travel_agency'
});

export default connection;