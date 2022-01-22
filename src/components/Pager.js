import React from "react";
import "./Pager.css"

class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items,
            pageCount: props.pageCount
        }
        this.state = this.calculate(this.state, 1);
    }

    calculate(state, pageNo) {
        let currentPageNum = pageNo;
        let totalPages = Math.ceil(state.items.length / state.pageCount);

        if (pageNo > totalPages)  // limit page number
            currentPageNum = totalPages;

        let hasPreviousPage = (currentPageNum != 1);  // only 1st page doesn't have previous
        let hasNextPage = (currentPageNum < totalPages)

        let firstIndex = (currentPageNum - 1) * state.pageCount
        let last = firstIndex + state.pageCount

        let itemsToShow = state.items.slice(firstIndex, last)

        let newState = {
            pageCount: state.pageCount,
            items: state.items,

            itemsToShow: itemsToShow,
            currentPage: currentPageNum,
            totalPages: totalPages,
            hasPreviousPage: hasPreviousPage,
            hasNextPage: hasNextPage
        }
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
        console.log("Deleting id: " + id) ;

        this.setState((prevState, _p) => {
            return {
                items: prevState.items.filter((item) => {
                    return item.id != id
                })
            }
        });

        this.setState((prevState, _p) => {
            return this.calculate(prevState, prevState.currentPage)
        })
    }

    render() {
        let pageNumberArray = new Array();

        let i = 1;
        for (; i <= this.state.totalPages; i++) {
            pageNumberArray.push(i)
        }
        const pages = pageNumberArray.map((index) => {
            return (
                <a href="#" key={index} onClick={this.handleClick.bind(this, index)}
                    className={(index == this.state.currentPage) ? "is-active" : ""}>
                    <li>{index}</li>
                </a>
            )
        });

        let propsToPass = {
            items: this.state.itemsToShow,
            deleteHandler: this.handleDelete
        }

        return (
            <div>
                {this.props.render(propsToPass)}
                <div className="container">
                    <div className="pagination p1">
                        <ul>
                            {this.state.hasPreviousPage ? <a href="#" onClick={this.handleClick.bind(this, this.state.currentPage - 1)}>{"<"}</a> : <span></span>}
                            {pages}
                            {this.state.hasNextPage ? <a href="#" onClick={this.handleClick.bind(this, this.state.currentPage + 1)}>{">"}</a> : <span></span>}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pager;