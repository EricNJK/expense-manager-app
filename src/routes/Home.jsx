import { NavLink, Outlet } from "react-router-dom";
import "./Home.css"

export default function Home() {
    return (
        <div>
            <div>
                <h1>Expense Manager</h1>
                <p>This branch <i>expense-manager-routing</i> uses <i>react-router-dom v6</i> for Home, List and Add routes.</p>
            </div>
            <nav>
                <NavLink to={"/"} >Expense List</NavLink>
                <NavLink to={"/add"} >Add Expense</NavLink>
            </nav>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}