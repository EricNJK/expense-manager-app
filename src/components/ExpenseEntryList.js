import React from "react";
import "./ExpenseEntryList.css"
import FormattedDate from "./FormattedDate";
import FormattedMoney from "./FormattedMoney";

class ExpenseEntryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items
        }

        this.handleMouseEnter = this.handleMouseEnter.bind();
        this.handleMouseLeave = this.handleMouseLeave.bind();
    }

    render() {
        let expense_rows = this.state.items.map((item) => {
            return (<tr key={item.id} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <td>{item.name}</td>
                <td><FormattedMoney value={item.amount} /></td>
                <td><FormattedDate value={item.spendDate} /></td>
                <td>{item.category}</td>
                <td><button onClick={(e) => {
                    this.handleDelete(item.id);
                }}>Remove</button></td>
            </tr>)
        });

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Amount</th>
                            <th>Spend Date</th>
                            <th>Category</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expense_rows}
                        <tr>
                            <td colSpan={1} className="total-label">Total Expenses</td>
                            <td colSpan={4} className="total-value">{this.getTotal()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
        this.setState((state, props) => {
            return {
                items: state.items.filter(item => {
                    return item.id !== item_id;
                })
            };
        });
    }

    handleMouseEnter(e) {
        e.target.parentNode.classList.add("highlight")
    }

    handleMouseLeave(e) {
        e.target.parentNode.classList.remove("highlight")
    }

    /*
    // lifecycle: before & after mounting
    // constructor
    componentDidMount() { console.log("ExpenseEntryItemList - componentDidMount") }

    // lifecycle: before, during and after updating
    shouldComponentUpdate(nextProps, nextState) { return true }// boolean
    static getDerivedStateFromProps(props, state) { return null }
    getSnapshotBeforeUpdate(prevProps, prevState) { return null }
    componentDidUpdate(prevProps, prevState, snapshot) { }

    // lifecycle: before unmounting
    componentWillUnmount() { }
    */
}

export default ExpenseEntryList;