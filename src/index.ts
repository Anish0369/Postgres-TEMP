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
  try {
    const q =
      "INSERT INTO userss (username, email, password) VALUES ('username1', 'username@gmail.com', 'bnftc') RETURNING *";
    const res = await client.query(q);
    console.log("Data inserted successfully", res);
  } catch (err) {
    console.error("Error inserting data", err);
  }
}

// insertData().catch((err) => console.error("Error inserting data", err));

/* to prevent injection */
async function insertData2() {
  try {
    const q = {
      text: "INSERT INTO userss (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      values: ["username2", "username2@gmail.com", "bnftc"],
    };
    const res = await client.query(q);
    console.log("Data inserted successfully", res);
  } catch (err) {
    console.error("Error inserting data", err);
  }
}

// insertData2().catch((err) => console.error("Error inserting data", err));

/* 
CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    pincode VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
*/


/* Inserting the data in it   */

/*INSERT INTO addresses (user_id, city, country, street, pincode)
VALUES (1, 'New York', 'USA', '123 Broadway St', '10001');*/


/*Applyiing joins */

async function getUserDetailsWithAddress(userId: string) {
  const client = new Client({
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: 'mysecretpassword',
  });

  try {
      await client.connect();
      const query = `
          SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
          FROM users u
          JOIN addresses a ON u.id = a.user_id
          WHERE u.id = $1
      `;
      const result = await client.query(query, [userId]);

      if (result.rows.length > 0) {
          console.log('User and address found:', result.rows[0]);
          return result.rows[0];
      } else {
          console.log('No user or address found with the given ID.');
          return null;
      }
  } catch (err) {
      console.error('Error during fetching user and address:', err);
      throw err;
  } finally {
      await client.end();
  }
}
// getUserDetailsWithAddress("1");


