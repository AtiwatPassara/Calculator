import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    database: "calculatordb",
    user: "root",
    password: "Pee/54666",
    host: "127.0.0.1",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;




