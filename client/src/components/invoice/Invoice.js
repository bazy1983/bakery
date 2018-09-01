import React, { Component } from "react";
import moment from "moment";
import API from "../../API/api";

//component
import { MdLibraryAdd, MdLayersClear } from "react-icons/md";

class Invoice extends Component {
    state = {
        records: [],
        businesses: null,
        productsList: null,
        unitPrice: "0.00",
        totalPrice: "0.00",
        productId: null,
        businessId: null,
        quantity: 0,
        invoice: "Loading...",
        invoiceId : null
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
        this.generateInvoice()
    }

    generateInvoice = () => { //get new invoice number
        API.invoiceNumber()
            .then((count) => {
                let invoiceNumber = count.data.count + 1;
                let invoice = moment().format("YYYYMMDD") + "-" + invoiceNumber;
                this.setState({
                    invoice: invoice
                })
            })

    }

    onProductSelect = (e) => {
        let selectedProduct = JSON.parse(e.target.value);
        this.setState({
            unitPrice: selectedProduct.price,
            productId: selectedProduct.id
        })
    }

    onBusinessSelect = (e) => { //creating new invoice record, and grab record id
        let businessID = e.target.value;
        let invoiceNumber = this.state.invoice;
        API.openInvoice(businessID, invoiceNumber)
            .then((invoice)=>{
                // console.log(invoice.data.id)
                this.setState({
                    businessId: businessID,
                    invoiceId : invoice.data.id
                })
                
            })
    }

    onQuantityChange = (e) => {
        let total = this.state.unitPrice * e.target.value;
        let correctedTotal = Math.round(total*100)/100;
        this.setState({
            totalPrice: correctedTotal,
            quantity: e.target.value
        })
    }

    newRecordSubmit = () => {
        let { unitPrice, totalPrice, productId, quantity,  invoiceId } = this.state;
        if (unitPrice && totalPrice && invoiceId && productId && quantity) {
            let record = {
                price: unitPrice,
                quantity: quantity,
                total: totalPrice,
                InvoiceId: invoiceId,
                ProductId: productId
            }
            API.invoiceRecord(record) //post record
                .then(() => {
                    this.getInvoiceRecords()
                })
            this.setState({
                unitPrice: "0.00",
                totalPrice: "0.00",
                productId: null,
                quantity: 0
            })
            this.refs.productSelect.value = "";
        } else {
            console.log("can not submit")
        }
    }

    getInvoiceRecords = () => {
        if (this.state.invoice) {
            API.recordsforInvoice(this.state.invoiceId)
                .then((records) => {
                    console.log(records.data)
                    this.setState({ records: records.data })
                })
        }
    }

    onNewInvoice = () =>{
        this.generateInvoice();
        this.setState({
            records : [],
            invoiceId : null,
            businessID : null
        })
        this.refs.businessSelect.value = "";
    }


    render() {
        let counter = 1;
        return (
            <div>
                <h4>Generate New Invoice</h4>
                <p>Invoice Number: {this.state.invoice}</p>
                <div>
                    Customer :
                        <div className="input-field inline" style={{ width: "65%" }}>
                            {/* dropdown of all businesses */}
                        <select className="browser-default" defaultValue="" onChange={this.onBusinessSelect} ref="businessSelect">
                            <option value="" disabled>Choose your option</option>
                            {this.state.businesses ?
                                this.state.businesses
                                    .map((business) => {
                                        return <option key={business.id} value={business.id} >{business.name}</option>
                                    })
                                : <option>Loading</option>}
                        </select>
                    </div>
                    {this.state.invoiceId?
                    <a href={`/report#${this.state.invoiceId}`} target="_blank" rel="noopener noreferrer"><button className="waves-effect waves-light btn inline" style={{ margin: "0px 5px" }}>Print</button></a>
                    :
                    <button className="waves-effect waves-light btn inline" style={{ margin: "0px 5px" }} disabled>Print</button>
                    }
                    <button className="waves-effect waves-light btn inline" onClick={this.onNewInvoice}>New</button>
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
                        {/* list all records for particular invoice number */}
                        {
                            this.state.records.length ?
                                this.state.records.map((record) => {
                                    return (
                                        <tr key={record.id}>
                                            <td>{counter++}</td>
                                            <td>{record.Product.name}</td>
                                            <td>{record.price}</td>
                                            <td>{record.quantity}</td>
                                            <td>{record.total}</td>
                                        </tr>
                                    )
                                })
                                :
                                null
                        } 
                        <tr>{/* start new record fields */}
                            <td>{counter++}</td>
                            <td>
                                {/* Product Dropdown */}
                                <select className="browser-default" defaultValue="" onChange={this.onProductSelect} ref="productSelect">
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
                            <td><input type="number" onChange={this.onQuantityChange} value={this.state.quantity}/></td>
                            <td>{this.state.totalPrice}</td>
                            <td className="blue-text">
                                <MdLibraryAdd onClick={this.newRecordSubmit} style={{ transform: "scale(1.2)", margin: "0px 5px" }} />
                                <MdLayersClear style={{ transform: "scale(1.2)" }} />
                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>
        )
    }
}

export default Invoice;