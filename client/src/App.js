import React, { Component } from 'react';
import './App.css';

//components
import Navbar from "./components/navbar/Navbar"
import Products from "./components/products/Products"
import Business from "./components/business/Business"

class App extends Component {
  state = {
    showProducts : false,
    showBusiness : true
  }

  showComponentToggler = (compName)=>{
    this.setState({[compName] : !this.state[compName]});
  }

  render() {
    return (
      <div className="App">
        <Navbar showComponent = {this.showComponentToggler}/>
        <div className="container">
          {this.state.showProducts?<Products />:null}
          {this.state.showBusiness?<Business />:null}
        </div>
      </div>
    );
  }
}

export default App;
