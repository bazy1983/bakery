import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css"

// components
import { MdExpandMore } from "react-icons/md";


const Navbar = (props) => {
  let path = window.location.pathname;
  return (
    <div className={path==="/report"? "hidden": null}>
      <ul id="dropdown1" className="dropdown-content">
        <li><Link to="/">New</Link></li>
        <li><a href="/all-invoices">All</a></li>
        <li className="divider"></li>
        <li><a href="#!">three</a></li>
      </ul>
      <nav>
        <div className="nav-wrapper green darken-4">
          <h5 className="left">Wayne's Bakery</h5>
          <ul id="nav-mobile" className="right">
            <li><NavLink to="/products">Products</NavLink></li>
            <li><a href="/business">Customers</a></li>
            <li><a className="dropdown-trigger" data-target="dropdown1">Invoice<MdExpandMore/></a></li>
          </ul>
        </div>
      </nav>
    </div>
  )
};

export default Navbar