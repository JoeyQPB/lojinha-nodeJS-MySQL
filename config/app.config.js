const routes = require('../routes/index')
const Db = require('../db/dbConnection')
const tables = require('../db/tables')

module.exports = (app, express) => {
    require('dotenv').config();
    routes(app, express);
    tables.init(Db);
}