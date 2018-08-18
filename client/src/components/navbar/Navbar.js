import React from "react";
import "./navbar.css"

const Navbar = (props) => {
  return (
    <nav>
      <div className="nav-wrapper green darken-4">
        <h5 className="left">Wayne's Bakery</h5>
        <ul id="nav-mobile" className="right">
          <li><a onClick={props.showComponent.bind(this, "showProducts")}>Products</a></li>
          <li><a onClick={props.showComponent.bind(this, "showBusiness")}>Customers</a></li>
          <li><a >Invoice</a></li>
        </ul>
      </div>
    </nav>
  )
};

export default Navbar