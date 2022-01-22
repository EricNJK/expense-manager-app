import React, { useState, useEffect } from "react";
import "./ExpenseEntryList.css"

function ExpenseEntryItemListFn(props) {
    const [items, setItems] = useState(props.items);

    const lists = items.map(t => {
        return (
            <tr key={t.id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <td>{t.name}</td>
                <td>{t.amount}</td>
                <td>{new Date(t.spendDate).toDateString()}</td>
                <td>{t.category}</td>
                <td><button onClick={e => handleDelete(t.id, e)}>Remove</button></td>
            </tr>
        )
    });


    function getTotal() {
        let result = 0;

        items.forEach(item => {
            result += item.amount
        });
        return result;
    }

    function handleDelete(item_id, e) {
        console.log("handleDelete: " + item_id);

        setItems(items.filter(item => {
            return item.id !== item_id;
        }));
    }

    function handleMouseEnter(e) {
        e.target.parentNode.classList.add("highlight")
    }

    function handleMouseLeave(e) {
        e.target.parentNode.classList.remove("highlight")
    }

    // useEffect hook: this is a function call, we're inside ExpenseEntryItemListFn()
    //useEffect(callback, deps);
    useEffect(
        function () {

        });

    // return component
    return (
        <div>
            <div>{props.header}</div>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {lists}
                    <tr>
                        <td colSpan="1" style={{ textAlign: "right" }}>Total Amount</td>
                        <td colSpan="4" style={{ textAlign: "left" }}>
                            {getTotal()}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>{props.footer}</div>
        </div>
    );
    // lifecycle example
    function componentDidMount() {
        console.log("ExpenseEntryItemListFn :: Init :: didMount")
    }

}

export default ExpenseEntryItemListFn;