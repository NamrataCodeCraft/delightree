
const mongoose = require("mongoose");
require('dotenv').config()

async function databaseConnection() {
    try {
        await mongoose.connect(process.env.DBURL)
        console.log('database is connected')

    } catch (err) {
        console.log('errr', err)
    }

}

module.exports = databaseConnection