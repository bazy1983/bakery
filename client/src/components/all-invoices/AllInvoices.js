import React, { Component, Fragment } from "react";
import API from "../../API/api";
import "./AllInvoices.css"

//components
import { MdPrint } from "react-icons/md";

class AllInvoices extends Component {
    state = {
        invoices: []
    }

    componentDidMount = () => {
        this.getAllRecords("DESC")
    }

    getAllRecords = (sort, query) => {
        let sorting = "DESC";
        if(sort !== "DESC" && sort !== "ASC"){
            sorting = sort.target.value;
        }
        if (query === undefined){
            query = 2; //all invoice numbers start with number 2
        }
        API.allInvoices(sorting, query)
            .then((invoices) => {
                // console.log(invoices.data)
                this.setState({
                    invoices: invoices.data
                })
            })
    }

    test=(e)=>{
        if (e.key === "Enter"){
            let sorting = this.refs.sorting.value;
            let query = e.target.value
            this.getAllRecords(sorting, query)
        }
    }



    render() {
        return (
            <Fragment>
                {/* query controls */}
                <div className="z-depth-2">
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="Search Invoice" id="searchInvoice" type="number" className="validate" onKeyPress={this.test} />
                            <label>Search Invoice number:</label>
                        </div>
                        <div className="input-field col s6">
                            <select onChange={this.getAllRecords} ref="sorting" defaultValue="SESC">
                                <option value="DESC">Newer to Older</option>
                                <option value="ASC">Older to Newer</option>
                            </select>
                            <label>Sorting:</label>
                        </div>
                    </div>
                </div>
                    {/* get all invoices */}
                <ul className="collapsible">
                    {this.state.invoices.length ?
                        this.state.invoices.map((invoice) => {
                            let total = 0
                            invoice.Orders.forEach((el) => {
                                total += el.total
                            });
                            let orderTable = invoice.Orders.map((el) => {
                                return (
                                    <tr key={el.id} className="centered">
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
                                        <span style={{ width: "35%" }}>Customer: {invoice.Business.name} </span>
                                        <span style={{ width: "15%" }}>records: {invoice.Orders.length} </span>
                                        <span style={{ width: "20%" }}>Amount: ${total} </span>
                                        <span className="print" style={{ width: "5%" }}><a href={`/report/${invoice.id}`} target="_blank" rel="noopener noreferrer"><MdPrint /></a> </span>
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
            </Fragment>
        )
    }
}

export default AllInvoices;