import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import './App.css';

//components
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products";
import Business from "./components/business/Business";
import Invoice from "./components/invoice/Invoice";
import AllInvoices from "./components/all-invoices/AllInvoices"
import Report from "./components/report/Report";
import ProductChart from "./components/chart-product/ProdChart";
import SalesChart from "./components/chart-sales/SalesChart";

class App extends Component {


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
              <Route path="/report" component={Report}/>
              <Route exact path="/product-chart" component={SalesChart}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
