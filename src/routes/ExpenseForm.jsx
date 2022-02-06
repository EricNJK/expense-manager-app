import { Button, InputAdornment, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { addExpense } from "../data";
import "./ExpenseForm.css";

export default function ExpenseForm() {
    const [expenseTitle, setTitle] = useState("");
    const [expenseAmount, setAmount] = useState("");
    const [expenseDate, setDate] = useState("");
    const [expenseCategory, setCategory] = useState("");

    const handleNameChange = (e) => {
        setTitle(e.target.value)
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }

    const handleDateChange = (e) => {
        setDate(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    const handleAddExpense = (e) => {
        // validate()

        let onSuccess = (updatedExpense) => {
            alert("Successfully added '" + updatedExpense.name + "'")
        }
        let onFailure = (message) => {
            alert("Could not add item\n" + message)
        }

        let data = {
            name: expenseTitle,
            amount: expenseAmount,
            spendDate: expenseDate,
            category: expenseCategory ? expenseCategory : "General"
        };

        addExpense(data, onSuccess, onFailure);
    }

    const resetForm = () => {
        setTitle("")
        setAmount("")
        setDate("")
        setCategory("")
    }

    const handleCancel = () => {
        resetForm();
        // navigate to "/" programmatically
    }

    return (
        <div>
            <Paper component="form" elevation={3} style={{ padding: '10px', paddingTop: '3px' }}>
                <h2>Add new Expense Entry</h2>
                <div id="spaced-children">
                    <TextField label="Title" id="title" variant="outlined" helperText="Name of item or service"
                        value={expenseTitle} onChange={handleNameChange} required />
                    <br />
                    <TextField variant="outlined" id="amount" label="Amount" type="number"
                        value={expenseAmount} onChange={handleAmountChange}
                        InputProps={{ startAdornment: <InputAdornment position="start">Kes</InputAdornment> }} />
                    <br />
                    <TextField variant="outlined" id="date" label="" type="date" helperText="Date Spent"
                        value={expenseDate} onChange={handleDateChange} required />
                    <br />
                    <TextField variant="outlined" id="category" label="Category"
                        value={expenseCategory} onChange={handleCategoryChange} />
                    <br /><br />

                    <div className="form-buttons">
                        <Button variant="contained" color="primary" onClick={handleAddExpense} >Add Expense</Button>
                        <div className="other-buttons">
                            <Button variant="outlined" color="secondary" onClick={resetForm} >Reset</Button>
                            <Button variant="outlined" color="error" onClick={handleCancel} >Cancel</Button>
                        </div>
                    </div>

                </div>
            </Paper>
        </div>
    )
}

