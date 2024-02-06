"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    //   host: 'my.database-server.com',
    //   port: 5432,
    //   database: 'database-name',
    //   user: 'database-user',
    //   password: 'secretpassword!!',
    connectionString: "postgresql://anish231003:28ISlVWrqHdk@ep-muddy-tree-a1nd83vx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
});
client.connect();
function createTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.query(`
    CREATE TABLE userss (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `);
            console.log("Table created successfully");
        }
        catch (err) {
            console.error("Error creating table", err);
        }
    });
}
/*for creatring a table */
// createTable().catch((err) => console.error("Error creating table", err));
/* for inserting data into table */
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const q = "INSERT INTO userss (username, email, password) VALUES ('username1', 'username@gmail.com', 'bnftc') RETURNING *";
            const res = yield client.query(q);
            console.log("Data inserted successfully", res);
        }
        catch (err) {
            console.error("Error inserting data", err);
        }
    });
}
// insertData().catch((err) => console.error("Error inserting data", err));
/* to prevent injection */
function insertData2() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const q = {
                text: "INSERT INTO userss (username, email, password) VALUES ($1, $2, $3) RETURNING *",
                values: ['username2', 'username2@gmail.com', 'bnftc']
            };
            const res = yield client.query(q);
            console.log("Data inserted successfully", res);
        }
        catch (err) {
            console.error("Error inserting data", err);
        }
    });
}
insertData2().catch((err) => console.error("Error inserting data", err));
