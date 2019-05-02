const express = require("express");
const app =  express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 5000;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
// npm i --S mongodb     <---- To install new mongo atlas

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Config:
const CONNECTION_URL = require("./config/keys_dev").mongoURI
const DATABASE_NAME = "traversyrestapi";

// Add Person to database:
app.post("/person", (request, response) => {
    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

//Grab all people from data base:
app.get("/people", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

// Grab Just one person:
app.get("/person/:id", (request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


// app.get("/", (req, res) => {
//     res.send("Please use /api/books or api/genres");
// });

// The new mongo atlas set up:
app.listen(port, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("people");
        console.log("Connected to DataBase:", DATABASE_NAME);
    });
});