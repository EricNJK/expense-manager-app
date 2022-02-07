import { Button, TableCell, TableContainer, TableRow, Paper, Table, TableHead, TableBody } from "@mui/material";
import FormattedDate from "./FormattedDate";
import FormattedMoney from "./FormattedMoney";
import "./ExpenseEntryList.css"

export default function ExpenseEntryList(props) {

    function getTotal() {
        let total = 0;

        if (props.isLoaded) {
            props.items.forEach(item => {
                let amt = parseFloat(item.amount);
                if (!isNaN(amt)) {
                    total += amt;
                }
            })
        }
        return total;
    }

    const handleMouseEnter = (e) => e.target.parentNode.classList.add("highlight");
    const handleMouseLeave = (e) => e.target.parentNode.classList.remove("highlight");
    const handleDelete = (itemId, e) => {
        console.log("deleting item with id: " + itemId);

        if (props.onDelete != null) {
            props.onDelete(itemId);
        }
    };

    let expenseRows = [];

    if (props.isLoaded) {
        expenseRows = props.items.map((item) => {
            return (
                <TableRow key={item._id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell><FormattedMoney value={item.amount} /></TableCell>
                    <TableCell><FormattedDate value={item.spendDate} /></TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell><Button variant="outlined" onClick={handleDelete.bind(this, item._id)}>Remove</Button></TableCell>
                </TableRow>
            )
        })
    }

    // all as one
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
                    {expenseRows}
                    <TableRow>
                        <TableCell colSpan={1} className="total-label"><b>Total</b></TableCell>
                        <TableCell colSpan={4} className="total-value">{getTotal()}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}