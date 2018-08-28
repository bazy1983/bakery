import React, { Component } from "react";
import API from "../../API/api";
import "./AllInvoices.css"

class AllInvoices extends Component {
    state = {
        invoices: []
    }

    componentDidMount = () => {
        API.allInvoices()
            .then((invoices) => {
                console.log(invoices.data)
                this.setState({
                    invoices: invoices.data
                })
            })
    }


    render() {
        return (
            <ul className="collapsible">
                {/* get all invoices */}
                {this.state.invoices.length ?
                    this.state.invoices.map((invoice) => {
                        let total = 0
                        invoice.Orders.forEach((el) => {
                            total += el.total
                        });
                        let orderTable = invoice.Orders.map((el) => {
                            return (
                                <tr key={el.id}>
                                    <td>{el.Product.name}</td>
                                    <td>${el.price}</td>
                                    <td>{el.quantity}</td>
                                    <td>${el.total}</td>
                                </tr>
                            )
                        })
                        return (
                            <li key={invoice.id}>
                                <div className="collapsible-header">
                                    <span style={{ width: "25%" }}>Invoice: {invoice.number} </span>
                                    <span style={{ width: "40%" }}>Customer: {invoice.Business.name} </span>
                                    <span style={{ width: "15%" }}>records: {invoice.Orders.length} </span>
                                    <span style={{ width: "20%" }}>Amount: ${total} </span>
                                </div>
                                <div className="collapsible-body">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                <th>Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderTable}
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        )
                    })
                    :
                    <li>No invoices for this month</li>
                }
            </ul>
        )
    }
}

export default AllInvoices;