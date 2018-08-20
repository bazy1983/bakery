import React, { Component } from "react";
import moment from "moment";
import API from "../../API/api";

class Invoice extends Component {
    state = {
        businesses: null,
        productsList: null,
        unitPrice: "0.00",
        totalPrice: "0.00"
    }

    componentDidMount = () => {
        API.getAllBusinesses()
            .then((businesses) => {
                this.setState({
                    businesses: businesses.data
                })
            })
        API.allProducts()
            .then((products) => {
                // console.log(products)
                this.setState({
                    productsList: products.data
                })

            })

    }

    countInvoicesAndGenerate = () => {
        return moment().format("YYYYMMDD");
    }

    onProductSelect = (e) => {
        this.setState({
            unitPrice: e.target.value
        })
        console.log(e.target)
    }

    onQuantityChange = (e) => {
        this.setState({
            totalPrice: this.state.unitPrice * e.target.value
        })
    }


    render() {
        let counter = 1;
        return (
            <div>
                <h4>Generate New Invoice</h4>
                <p>Invoice Number: {this.countInvoicesAndGenerate()}</p>
                <div>
                    Customer :
                        <div className="input-field inline" style={{ width: "70%" }}>
                        <select className="browser-default" defaultValue="">
                            <option value="" disabled>Choose your option</option>
                            {this.state.businesses ?
                                this.state.businesses
                                    .map((business) => {
                                        return <option key={business.id} value={business.id}>{business.name}</option>
                                    })
                                : <option>Loading</option>}
                        </select>
                    </div>
                </div>
                <hr />
                <table className="centered">
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }}>#</th>
                            <th style={{ width: "30%" }}>Product</th>
                            <th style={{ width: "10%" }}>Unit Price</th>
                            <th style={{ width: "10%" }}>Quantity</th>
                            <th style={{ width: "10%" }}>Total Price</th>
                            <th style={{ width: "20%" }}>Controls</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>{counter++}</td>
                            <td>buns</td>
                            <td>$0.87</td>
                            <td><input type="number" name="" id="" /></td>
                            <td>$1.55</td>
                        </tr>
                        <tr>
                            <td>{counter++}</td>
                            <td>
                                <select className="browser-default" defaultValue="" onChange={this.onProductSelect}>
                                    <option value="" disabled>Choose Product</option>
                                    {
                                        this.state.productsList ?
                                            this.state.productsList.map((item) => {
                                                return <option key={item.id} productid={item.id} value={item.price}>{item.name}</option>
                                            })
                                            :
                                            <option>Loading</option>
                                    }
                                </select>
                            </td>
                            <td >${this.state.unitPrice}</td>
                            <td><input type="number" onChange={this.onQuantityChange} /></td>
                            <td>{this.state.totalPrice}</td>
                            <td>
                                <button>Add</button>
                                <button>Clear</button>
                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>
        )
    }
}

export default Invoice;