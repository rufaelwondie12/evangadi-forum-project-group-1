const dbConnection = require("./config/dbConfig");

async function createTables() {
  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
            userid INT(11) NOT NULL AUTO_INCREMENT,
            username VARCHAR(20) NOT NULL,
            firstname VARCHAR(20) NOT NULL,
            lastname VARCHAR(20) NOT NULL,
            email VARCHAR(40) NOT NULL,
            password VARCHAR(100) NOT NULL,
            PRIMARY KEY (userid)
        )`,
    `CREATE TABLE IF NOT EXISTS questions (
            id INT(11) NOT NULL AUTO_INCREMENT,
            questionid VARCHAR(100) NOT NULL UNIQUE,
            userid INT(11) NOT NULL,
            title VARCHAR(50) NOT NULL,
            description VARCHAR(200) NOT NULL,
            tag VARCHAR(20),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            FOREIGN KEY (userid) REFERENCES users(userid)
        )`,
    `CREATE TABLE IF NOT EXISTS answers (
            answerid INT(11) NOT NULL AUTO_INCREMENT,
            userid INT(11) NOT NULL,
            questionid VARCHAR(100) NOT NULL,
            answer TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (answerid),
            FOREIGN KEY (userid) REFERENCES users(userid),
            FOREIGN KEY (questionid) REFERENCES questions(questionid)
        )`,
  ];

  try {
    for (let query of queries) {
      await dbConnection.query(query);
    }
    console.log("✅ All tables verified/created successfully.");
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
  }
}

module.exports = createTables;
