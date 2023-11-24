import { NavLink } from "react-router-dom";
import style from "./Menu.module.css";

import "./Active.css";
import FilterWeight from "../filterComponents/FilterWeight";
import OrderBy from "../filterComponents/OrderBy";
function Menu() {
  return (
    <nav className={style.NavContainer}>
      <ul className={style.UlContent}>
        <NavLink
          to="/home?page=1"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Home
        </NavLink>
        <NavLink to="/Dogs?page=1">Dogs</NavLink>
        <NavLink to={"/FormCreate"}>Create</NavLink>
        <NavLink to="/">Exit</NavLink>
      </ul>
      <FilterWeight></FilterWeight>
      <OrderBy></OrderBy>
    </nav>
  );
}

export default Menu;
