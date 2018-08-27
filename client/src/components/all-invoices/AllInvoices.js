import React, { Component } from "react";
import API from "../../API/api";
import "./AllInvoices.css"

class AllInvoices extends Component {
    state = {
        invoices: []
    }

    componentDidMount = () => {
        API.recordsCountSum()
            .then((invoices) => {
                console.log(invoices.data)
                this.setState({
                    invoices : invoices.data
                })
            })
    }


    render() {
        return (
            <ul className="collapsible">
                {this.state.invoices.length ?
                    this.state.invoices.map((invoice) => { 
                        {/* get all invoices */}
                        return (
                            <li key={invoice.id}>
                                <div className="collapsible-header">
                                    <span style={{width:"25%"}}>Invoice: {invoice.invoice} </span>
                                    <span style={{width:"40%"}}>Customer: {invoice.Business.name} </span>
                                    <span style={{width:"15%"}}>records: {invoice.num} </span>
                                    <span style={{width:"20%"}}>Amount: {Math.round(invoice.final*100)/100} </span>
                                </div>
                                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
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