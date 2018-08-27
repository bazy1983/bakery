import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import './App.css';

//components
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products";
import Business from "./components/business/Business";
import Invoice from "./components/invoice/Invoice";
import AllInvoices from "./components/all-invoices/AllInvoices"

class App extends Component {
  state = {
    showProducts: false,
    showBusiness: false,
    showInvoice: true
  }

  showComponentToggler = (compName) => {
    this.setState({ [compName]: !this.state[compName] });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Invoice} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/business" component={Business} />
              <Route exact path="/all-invoices" component={AllInvoices}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
