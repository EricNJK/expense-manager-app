import React from "react";
import FormattedDate from "./FormattedDate";
import FormattedMoney from "./FormattedMoney";
import { TableContainer, Paper, Table, TableHead, TableBody, TableCell, TableRow } from "@mui/material";
import "./ExpenseEntryList.css"

class ExpenseEntryListMui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    render() {
        let expense_rows = [];

        if (this.props.isLoaded) {
            expense_rows = this.state.items.map((item) => {
                return (
                    <TableRow key={item._id} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell><FormattedMoney value={item.amount} /></TableCell>
                        <TableCell><FormattedDate value={item.spendDate} /></TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell><button onClick={this.props.onDelete.bind(this, item._id)}>Remove</button></TableCell>
                    </TableRow>)
            });
        }

        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Amount (Kes)</TableCell>
                            <TableCell>Spend Date</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expense_rows}
                        <TableRow>
                            <TableCell colSpan={1} className="total-label">Total</TableCell>
                            <TableCell colSpan={4} className="total-value">{this.getTotal()}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    getTotal() {
        let result = 0;

        if (this.props.isLoaded) {
            this.state.items.forEach(item => {
                let amt = parseFloat(item.amount);
                if (!isNaN(amt))
                    result += amt;
            });
        }
        return result;
    }

    // event handlers
    handleDelete(item_id, e) {
        console.log("handleDelete: " + item_id);

        if (this.props.onDelete != null) {
            this.props.onDelete(item_id, e);
        }
    }

    handleMouseEnter(e) {
        e.target.parentNode.classList.add("highlight")
    }

    handleMouseLeave(e) {
        e.target.parentNode.classList.remove("highlight")
    }

    // lifecycle: part of initialization
    static getDerivedStateFromProps(props, state) {
        // save items to this.state
        return {
            items: props.items
        };
    }
}

export default ExpenseEntryListMui;