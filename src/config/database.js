import dotenv from "dotenv";
import {Sequelize} from "sequelize";

dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME || "test",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        dialect: "mysql"
    }
);

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (e) {
        console.error("Unable to connect to the database:", e);
    }
}

export {sequelize, dbConnection}