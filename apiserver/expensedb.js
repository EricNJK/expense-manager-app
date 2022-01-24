import Nedb from "nedb";
import { readFile } from "fs";

export var expenseDB = new Nedb({ filename: "expenses.db", autoload: true });

// find all with 'empty' query, load if db is empty
let query_options = {}
expenseDB.find(query_options, (error, docs) => {
    if (docs.length == 0) {
        loadExpenses();
    }
});

function loadExpenses() {
    readCsv("data.csv", (expenseItem) => {
        expenseDB.insert(expenseItem, (err, document) => {
            console.log("Inserted ", document.name, "with id: ", document._id);
        })
    })
}

/**
 * Parses Expense items from csv to objects {name, amount...}
 * 
 * @param _path Path to file containing csv data
 * @param onItemRead Callback function for each expense entry object
 */
function readCsv(_path, onItemRead) {

    readFile(_path, 'utf-8', (err, data) => {
        if (err) throw err;

        let lines = data.split('\r\n');
        lines.forEach(line => {
            try {
                let split_line = line.split(',');

                let expenseItem = {
                    name: split_line[0],
                    amount: parseFloat(split_line[1]),
                    spendDate: split_line[2],
                    category: split_line[3]
                }

                onItemRead(expenseItem);
            } catch (err) {
                console.log("readCsv: error parsing '" + line + "...'");
            }
        });
    })
}
