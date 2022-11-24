const mongo = require('mongoose');
module.exports = function connect(dbname) {

    mongo.connect("mongodb+srv://sentry:sentry@cluster0.la2i7lg.mongodb.net/?retryWrites=true&w=majority").then(console.log("Sucessfully ! connected to database")).catch(err => console.log(err))
}