import Sequelize from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASS, {
    //configuración del host
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: '3306',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    opetatorsAliases: false
});

export default db;