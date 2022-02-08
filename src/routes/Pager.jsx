import { Link } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import ExpenseEntryList from "../components/ExpenseEntryList";
import { deleteRemoteExpense, getExpenses } from "../data";
import "./Pager.css";

/**
 * Component for parsing remote expenses to paginated ExpenseEntryLists
 * 
 * @param props Properties including pageCount
 */
export default function Pager(props) {
    // State variables
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
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

    const handleDelete = (id, e) => {
        console.log("Deleting id: " + id)
        deleteRemoteExpense(id)
            .finally(() => updateExpenseList(true))  // refresh expenses
            .catch((reason) => {
                console.log("handleDelete error", reason);
                setIsLoaded(false)
            });
    }

    const calculate = () => {
        let totalPg = Math.ceil(items.length / itemsPerPage);
        let firstIndex = (currentPage - 1) * itemsPerPage;
        let lastIndex = firstIndex + itemsPerPage;

        setTotalPages(totalPg);
        setHasPreviousPage(currentPage != 1)
        setHasNextPage(currentPage < totalPg)
        setItemsToShow(items.slice(firstIndex, lastIndex));
    }

    const updateExpenseList = (refresh) => {
        if (refresh || !isLoaded) {
            getExpenses().then(expenses => {
                setItems(expenses);
                setIsLoaded(true);
            }, (reason) => setIsLoaded(false));
        }
    }

    // Rendering work
    useEffect(() => {
        updateExpenseList();  // initial update
    }, []);

    useEffect(() => {
        calculate(currentPage);
    }, [items, currentPage])

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
                    onDelete={handleDelete}
                    isLoaded={isLoaded} />
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
