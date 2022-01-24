import { expenseDB } from "./expensedb.js";
import express from "express";
import cors from "cors"
import bodyParser from "body-parser"


// create express app, default cors config
var app = express();
app.use(cors());

// configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// start express app
const HTTP_PORT = 8000;
app.listen(HTTP_PORT, () => {
    console.log("Server running ")
})

// request mappings
app.get("/", (req, res, next) => {
    res.status(200).json({ message: "Welcome to Eric's first Express.js server" })
});

app.get("/api/expenses", (req, res, next) => {
    expenseDB.find({}, (err, docs) => {
        res.json({ expenses: docs })
    })
});

app.get("/api/expense/:id", (req, res, next) => {
    let id = req.params.id;

    expenseDB.find({ _id: id }, (err, docs) => {
        if (docs.length == 0) {
            res.status(404).json({ message: ("expense not found. id: " + id), expenses: [] })
        } else {
            res.status(200).json({ expenses: docs })
        }
    })
});

/**
 * Adds new Expense item to DB
 * 
 * requires json data 
 *  {
 *      item: {name: "", amount: 0, category: "", spendDate: "date string"}
 *  }
 */
app.post("/api/expense/", (req, res, next) => {
    var errors = []
    if (!req.body.item) {
        errors.push("No expense item provided");
        res.status(400).json({ message: errors[0] });
    } else {
        let itemToAdd = {
            name: req.body.item.name,
            amount: req.body.item.amount,
            spendDate: req.body.item.spendDate,
            category: req.body.item.category
        }

        expenseDB.insert(itemToAdd, (err, insertedDoc) => {
            if (err) {
                //errors.push(err);
                console.log("Error inserting expense item", itemToAdd.name ? (": " + itemToAdd.name) : "")

            } else {
                // return new document with _id
                // Created 201
                res.status(201).json({ expenses: insertedDoc })
            }
        })
    }
});

// update existing
app.put("/api/expense/:id", (req, res, next) => {
    var errors = []

    if (!req.body.item) {
        // bad request 400
        errors.push("No expense item provided")
        res.status(400).json({ message: errors[0] });
    } else {
        let id = req.params.id;
        let expenseItem = req.body.item;
        expenseItem._id = id;

        expenseDB.update({ _id: id }, expenseItem, (err, doc) => {
            return res.json({ message: doc > 0 ? "updated" : "update failed" });
        });
    }

});

app.delete("/api/expense/:id", (req, res, next) => {
    let id = req.params.id;
    if (!id) {
        res.status(400).json({ message: "Id not provided" });
    } else {
        expenseDB.remove({ _id: id });
        res.json({ message: "deleted" });
    }

});

app.use((req, res) => {
    res.status(404).json({ message: "Invalid path" })
});