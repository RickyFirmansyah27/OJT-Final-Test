import {Sequelize} from "sequelize";

const db = new Sequelize('final_ojt', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;