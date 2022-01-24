import React from "react";
import FormattedDate from "./FormattedDate";
import FormattedMoney from "./FormattedMoney";
import { TableContainer, Paper, Table, TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

class ExpenseEntryListMui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    render() {
        const StyledTableRow = withStyles((theme) => ({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.action.hover
                }
            },

        }))(TableRow);

        const StyledTableCell = withStyles((theme) => ({
            head: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white
            },
            body: {
                fontSize: 14
            }
        }))(TableCell);

        let expense_rows = this.state.items.map((item) => {
            return (
                <StyledTableRow key={item.id} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <StyledTableCell>{item.name}</StyledTableCell>
                    <StyledTableCell><FormattedMoney value={item.amount} /></StyledTableCell>
                    <StyledTableCell><FormattedDate value={item.spendDate} /></StyledTableCell>
                    <StyledTableCell>{item.category}</StyledTableCell>
                    <StyledTableCell><button onClick={this.props.onDelete.bind(this, item.id)}>Remove</button></StyledTableCell>
                </StyledTableRow>)
        });

        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Item</StyledTableCell>
                            <StyledTableCell>Amount</StyledTableCell>
                            <StyledTableCell>Spend Date</StyledTableCell>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>Remove</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expense_rows}
                        <StyledTableRow>
                            <StyledTableCell colSpan={1} className="total-label">Total</StyledTableCell>
                            <StyledTableCell colSpan={4} className="total-value">{this.getTotal()}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    getTotal() {
        let result = 0;

        this.state.items.forEach(item => {
            result += item.amount
        });
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