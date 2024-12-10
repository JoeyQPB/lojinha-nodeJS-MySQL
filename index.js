const express = require('express')
const app = express();
require('dotenv').config();
const appConfig = require('./config/app.config');
appConfig(app, express);

app.listen(process.env.PORT, () => {
    console.log(`[:] App running on port: ${process.env.PORT}`)
})