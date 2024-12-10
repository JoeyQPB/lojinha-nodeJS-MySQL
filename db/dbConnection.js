const mysql = require('mysql2');
const { db_host, db_user, db_password, db_port, db_database } = process.env

class Db {

  connection() {
    return mysql.createConnection({
      host: db_host, 
      port: db_port,
      user: db_user, 
      password: db_password,
      database: db_database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

    executeQuery(sql, params =  "") {
        const connection = this.connection()
        return new Promise((resolve, reject) => {
            connection.query(sql, params, (error, response) => {
                if (error) return reject(error)
                return resolve(response);
            })
        })
    }
}

module.exports = new Db;