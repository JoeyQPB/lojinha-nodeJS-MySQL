class Tables {

    init (db) {
        this.db = db;
        this.createProductTable();
    }

    createProductTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                quantity INT NOT NULL,
                status ENUM('available', 'unavailable') NOT NULL DEFAULT 'available'
            );
        `;

        this.db.executeQuery(sql)
            .then(() => console.log("[>] Table created successfully"))
            .catch(() => console.log("[>] Error while create tables"))
            
    }
}

module.exports = new Tables;