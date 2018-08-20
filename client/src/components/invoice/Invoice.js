import React, { Component } from "react";
import moment from "moment";
import API from "../../API/api";

class Invoice extends Component {
    state = {
        record: null,
        businesses: null,
        productsList: null,
        unitPrice: "0.00",
        totalPrice: "0.00",
        productId: null,
        businessId: null,
        quantity : 0
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

    generateInvoice = () => {
        return moment().format("YYYYMMDD");
    }

    onProductSelect = (e) => {
        let selectedProduct = JSON.parse(e.target.value);

        this.setState({
            unitPrice: selectedProduct.price,
            productId: selectedProduct.id
        })
    }

    onBusinessSelect = (e) => {
        this.setState({
            businessId: e.target.value
        })
    }

    onQuantityChange = (e) => {
        this.setState({
            totalPrice: this.state.unitPrice * e.target.value,
            quantity : e.target.value
        })
    }

    newRecordSubmit = () => {
        let {unitPrice, totalPrice, businessId, productId, quantity} = this.state;
        if (unitPrice && totalPrice && businessId && productId && quantity){
            console.log("can submit")
        } else {
            console.log("can not submit")
        }
    }


    render() {
        let counter = 1;
        return (
            <div>
                <h4>Generate New Invoice</h4>
                <p>Invoice Number: {this.generateInvoice()}</p>
                <div>
                    Customer :
                        <div className="input-field inline" style={{ width: "70%" }}>
                        <select className="browser-default" defaultValue="" onChange={this.onBusinessSelect}>
                            <option value="" disabled>Choose your option</option>
                            {this.state.businesses ?
                                this.state.businesses
                                    .map((business) => {
                                        return <option key={business.id} value={business.id} >{business.name}</option>
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
                                                return <option key={item.id} value={JSON.stringify({
                                                    id: item.id,
                                                    price: item.price
                                                })}>{item.name}</option>
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
                                <button onClick={this.newRecordSubmit}>Add</button>
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