import React from "react";
import "./Pager.css"

class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            pageCount: props.pageCount
        }
    }

    calculate(state, pageNo, remoteItems) {
        let newState = {
            pageCount: state.pageCount,
            items: (remoteItems ? remoteItems : state.items),
            isLoaded: state.isLoaded
        }

        let currentPageNum = pageNo;

        let totalPages = 0;
        if (newState.items)
            totalPages = Math.ceil(newState.items.length / newState.pageCount);
        else
            totalPages = Math.ceil(newState.items.length / newState.pageCount);

        if (pageNo > totalPages)  // limit page number
            currentPageNum = totalPages;

        let hasPreviousPage = (currentPageNum != 1);  // only 1st page doesn't have previous
        let hasNextPage = (currentPageNum < totalPages)

        let firstIndex = (currentPageNum - 1) * newState.pageCount
        let last = firstIndex + newState.pageCount

        let itemsToShow = newState.items.slice(firstIndex, last)

        newState.itemsToShow = itemsToShow
        newState.currentPage = currentPageNum
        newState.totalPages = totalPages
        newState.hasPreviousPage = hasPreviousPage
        newState.hasNextPage = hasNextPage

        return newState;
    }

    handleClick(pageNo, e) {
        e.preventDefault();
        this.setState((s, _p) => {
            return this.calculate(s, pageNo)
        });
    }

    handleDelete(id, e) {
        e.preventDefault();
        console.log("Deleting id: " + id);
        this.deleteRemoteItem(id);
    }

    render() {
        let pageNumberArray = [];

        let i = 1;
        for (; i <= this.state.totalPages; i++) {
            pageNumberArray.push(i)
        }
        const pages = pageNumberArray.map((index) => {
            return (
                <a href="#" key={index} onClick={this.handleClick.bind(this, index)}
                    className={(index == this.state.currentPage) ? "is-active" : ""}>
                    {index}
                </a>
            )
        });

        let propsToPass = {
            items: this.state.itemsToShow,
            isLoaded: this.state.isLoaded,
            deleteHandler: this.handleDelete.bind(this)
        }

        return (
            <div>
                {this.props.renderList(propsToPass)}
                <div className="container">
                    <div className="pagination p1">
                        <ul>
                            {this.state.hasPreviousPage ? <a href="#" onClick={this.handleClick.bind(this, this.state.currentPage - 1)}>{"<Previous"}</a> : <span></span>}
                            {pages}
                            {this.state.hasNextPage ? <a href="#" onClick={this.handleClick.bind(this, this.state.currentPage + 1)}>{"Next>"}</a> : <span></span>}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    // Load from 'apiserver'
    BASE_URL = "http://localhost:8000";
    fetchRemoteItems() {
        console.log("fetchRemoteItems...");
        fetch(this.BASE_URL + "/api/expenses")
            .then(res => res.json())
            .then(resp => {
                if (resp.expenses) {
                    this.setItems(resp.expenses)
                }
            })
    }

    setItems(remoteItems) {
        this.setState((s, p) => this.calculate(s, 1, remoteItems));
        this.setState((_s, _p) => {
            return {
                isLoaded: true
            }
        });
    }

    // lifecycle: Mounted
    componentDidMount() {
        this.fetchRemoteItems()
    }

    deleteRemoteItem(id) {
        fetch(this.BASE_URL + "/api/expense/" + id, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => { this.fetchRemoteItems() },
                (reason) => {
                    console.log("deleteRemoteItem error", reason);
                    this.setState((_s, _p) => {
                        return {
                            isLoaded: false
                        }
                    });
                });
    }
}

export default Pager;