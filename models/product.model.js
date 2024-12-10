const Db = require('../db/dbConnection');

class ProductModel {
    async insert (newProduct) {
      const sql = 'INSERT INTO products SET ?;'
      let result = null;
      try {
        result = await Db.executeQuery(sql, newProduct);
        console.log(result)
      } catch (error) {
        console.log({error})
        return error;
      }
      return this.select(result.insertId);
    }

    select (id) {
        const sql = 'SELECT * FROM products WHERE ID = ?'
        return Db.executeQuery(sql, id);
    }

    selectAll () {
        const sql = 'SELECT * FROM products;'
        return Db.executeQuery(sql);
    }

    update (id, product) {
        const sql = "UPDATE products SET ? WHERE id = ?";
        return Db.executeQuery(sql, [product, id]);
    }

    delete (id) {
        const sql = "DELETE FROM products WHERE id = ?";
        return Db.executeQuery(sql, id);
    }
}

module.exports = new ProductModel;