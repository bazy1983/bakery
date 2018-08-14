import React, { Component } from 'react';
import './App.css';

//components
import Navbar from "./components/navbar/Navbar"
import Products from "./components/products/Products"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Products />
        </div>
      </div>
    );
  }
}

export default App;
