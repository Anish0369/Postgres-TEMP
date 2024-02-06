import { Client } from "pg";

const client = new Client({
  //   host: 'my.database-server.com',
  //   port: 5432,
  //   database: 'database-name',
  //   user: 'database-user',
  //   password: 'secretpassword!!',
  connectionString:
    "",
});

client.connect();

async function createTable() {
  try {
    await client.query(`
    CREATE TABLE userss (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `);
    console.log("Table created successfully");
  } catch (err) {
    console.error("Error creating table", err);
  }
}
/*for creatring a table */
// createTable().catch((err) => console.error("Error creating table", err));



/* for inserting data into table */



async function insertData() {


    try{
       const q = "INSERT INTO userss (username, email, password) VALUES ('username1', 'username@gmail.com', 'bnftc') RETURNING *";
         const res = await client.query(q);
            console.log("Data inserted successfully", res);
    }catch(err){
        console.error("Error inserting data", err);
    }
    
}


// insertData().catch((err) => console.error("Error inserting data", err));

/* to prevent injection */
async function insertData2() {


    try{
         
        const q = {
            text: "INSERT INTO userss (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            values: ['username2', 'username2@gmail.com', 'bnftc']
        }
         const res = await client.query(q);
            console.log("Data inserted successfully", res);
    }catch(err){
        console.error("Error inserting data", err);
    }
    
}

insertData2().catch((err) => console.error("Error inserting data", err));