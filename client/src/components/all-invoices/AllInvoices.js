import React, { Component, Fragment } from "react";
import API from "../../API/api";
import months from "../../API/months.json"
import "./AllInvoices.css"

//components
import { MdPrint, MdRefresh } from "react-icons/md";

class AllInvoices extends Component {
    state = {
        invoices: []
    }

    componentDidMount = () => {
        this.getAllRecords("DESC")
        console.log(months)
    }

    getAllRecords = (sort, query) => {
        let sorting = "DESC";
        if (sort !== "DESC" && sort !== "ASC") {
            sorting = sort.target.value;
        }
        if (query === undefined) {
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

    queryInvoice = (e) => {
        if (e.key === "Enter") {
            let sorting = this.refs.sorting.value;
            let query = e.target.value
            if (query === ""){
                query = 2 // all invoices start with 2, that brings back all records
            }
            this.getAllRecords(sorting, query)
        }
    }

    resetInput = () => {
        this.refs.queryInput.value = "";
        let input = {
            key : "Enter",
            target :{
                value : ""
            }
        }
        this.queryInvoice(input)
    }



    render() {
        return (
            <Fragment>
                {/* query controls */}
                <div className="z-depth-2">
                    <div className="row">
                        <div className="input-field col s1">
                            <MdRefresh style={{transform:"scale(2) translateY(5px)"}} onClick={this.resetInput} ref="reset"/>
                        </div>
                        <div className="input-field col s5">
                            <input placeholder="Search Invoice" id="searchInvoice" type="number" className="validate" onKeyPress={this.queryInvoice} ref="queryInput" />
                            <label>Search Invoice number:</label>
                        </div>
                        {/* <div className="input-field col s4">
                            <select defaultValue="">
                                <option value="" disabled>Select Month</option>
                                {months.map((month) => {
                                    return(
                                        <option value={month.number} key={month.number}>{month.name}</option>
                                    )
                                })}
                            </select>
                            <label>Month:</label>
                        </div> */}
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
                                        <span style={{ width: "20%" }}>Amount: ${Math.round(total*100)/100} </span>
                                        <span className="print" style={{ width: "5%" }}><a href={`/report#${invoice.id}`} target="_blank" rel="noopener noreferrer"><MdPrint /></a> </span>
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