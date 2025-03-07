const { MongoClient } = require('mongodb');
const uri = "mongodb://soumik-local-mongo:27017";
const client = new MongoClient(uri);

module.exports = client;