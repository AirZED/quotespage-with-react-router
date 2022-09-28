import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation(props) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Great Quotes</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to={"/quotes"}>
              All Qoutes
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to={"/quotes/:quotesId"}>
              Quotes Detail
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to={"/new-quote"}>
              New Qoutes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
