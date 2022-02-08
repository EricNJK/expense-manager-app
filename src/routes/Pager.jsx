import { Link } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { addExpense, deleteExpense, setLoadState } from "../actions";
import ExpenseEntryList from "../components/ExpenseEntryList";
import { getExpenses } from "../data";
import "./Pager.css";

/**
 * Component for parsing remote expenses to paginated ExpenseEntryLists
 * 
 * @param props Properties including pageCount
 */
export function Pager(props) {
    // State variables
    // isLoaded, items Moved to Redux store
    // default 3 items per page
    const [itemsPerPage, setItemsPerPage] = useState(props.pageCount ? props.pageCount : 3);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [itemsToShow, setItemsToShow] = useState([]);

    // Event handlers
    const handlePageNavClick = (pageNo, e) => {
        e.preventDefault();
        setCurrentPage(pageNo);  // useEffect hook will call calculate()
    }

    const calculate = () => {
        let totalPg = Math.ceil(props.items.length / itemsPerPage);
        let firstIndex = (currentPage - 1) * itemsPerPage;
        let lastIndex = firstIndex + itemsPerPage;

        setTotalPages(totalPg);
        setHasPreviousPage(currentPage != 1)
        setHasNextPage(currentPage < totalPg)
        setItemsToShow(props.items.slice(firstIndex, lastIndex));
    }

    // Rendering work
    useEffect(() => {
        updateExpenseList();  // initial update
    }, []);

    const updateExpenseList = (refresh) => {
        if (refresh || !props.isLoaded) {
            getExpenses().then(expenses => {
                expenses.forEach(e => props.onAddExpense(e))
                props.setIsLoaded(true);
            }, (reason) => props.setIsLoaded(false));
        }
    }

    useEffect(() => {
        calculate(currentPage);
    }, [props.items, currentPage])

    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    const pageNavLinks = pageNumbers.map(pageNum => {
        return (
            <Link variant="button" href="#" key={pageNum}
                className={(pageNum == currentPage) ? "is-active" : ""}
                onClick={handlePageNavClick.bind(this, pageNum)} >
                {pageNum}
            </Link>
        )
    })

    // Creates a page with some items
    const renderList = () => {
        return (
            <div>
                <ExpenseEntryList items={itemsToShow}
                    onDelete={props.onDelete}
                    isLoaded={props.isLoaded} />
            </div>
        )
    }

    return (
        <div>
            {renderList()}
            <div className="container">
                <div className="pagination p1">
                    <ul>
                        {hasPreviousPage ? <a href="#" onClick={handlePageNavClick.bind(this, (currentPage - 1))}>{"<Previous"}</a> : <span></span>}
                        {pageNavLinks}
                        {hasNextPage ? <a href="#" onClick={handlePageNavClick.bind(this, (currentPage + 1))}>{"Next>"}</a> : <span></span>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

// Redux impl
// map redux store state to required props
const mapStateToProps = (state) => {
    return {
        items: state.items,
        isLoaded: state.isLoaded
    }
}

/**
 * 
 * @param dispatch Function to dispatch Redux Action to reducers
 * @returns 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onAddExpense: expense => dispatch(addExpense(expense)),
        onDelete: id => dispatch(deleteExpense(id)),
        setIsLoaded: b => dispatch(setLoadState(b))
    }
}

// higherOrderComponent = connect(...)
// export higherOrderComponent(Pager)
export default connect(mapStateToProps, mapDispatchToProps)(Pager)
