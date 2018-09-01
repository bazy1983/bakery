import React, { Fragment } from "react";
import "./report.css";
import API from "../../API/api";

class Report extends React.Component {
    state = {
        number: null,
        business: null,
        order: [],
        grand : null,
        date : null
    }

    componentDidMount() {
        let id = window.location.hash.substr(1);
        let today = new Date()
        API.invoiceToPrint(id)
            .then((invoice) => {
                let grand =0;
                invoice.data.Orders.forEach((el) => {
                    grand += el.total
                })
                console.log(invoice.data)
                this.setState({
                    number: invoice.data.number,
                    business: invoice.data.Business.name,
                    order : invoice.data.Orders,
                    grand : Math.round(grand*100)/100,
                    date : `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`
                })
                console.log(this.state)
            })
    }



    render() {
        return (
            <Fragment>
                <div className="print-logo">
                    <div className="print-col2">
                        <img src="./media/logo.png" alt="wayne" width="60%" height="60%" />
                    </div>
                    <div className="print-col6">
                        <div className="brand">
                            <p>Wayne's Bakery</p>
                            <i>French Bread</i>
                            <p>3856 Plank Rd, Baton Rouge, LA 70805</p>
                            <p>Phone: (225) 355-0351</p>
                        </div>
                    </div>
                    <div className="print-col3">
                        <p>Date: {this.state.date}</p>
                        <p>Invoice: {this.state.number}</p>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="invoice-content">
                    <div className="business-name">
                        <p>Customer Name: {this.state.business}</p>
                    </div>
                    <div className="invoice-details">
                        <table className="leftText">
                            <thead>
                                <tr>
                                    <th style={{ width: "10%" }}>#</th>
                                    <th style={{ width: "50%" }}>Product</th>
                                    <th style={{ width: "20%" }}>Price</th>
                                    <th style={{ width: "20%" }}>Quantity</th>
                                    <th style={{ width: "20%" }}>Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.order.length ?
                                    this.state.order.map((record, i) => {
                                        return (
                                            <tr className="record-line" key={record.id}>
                                                <td>{i+1}</td>
                                                <td>{record.Product.name}</td>
                                                <td>${record.price}</td>
                                                <td>{record.quantity}</td>
                                                <td>${record.total}</td>
                                            </tr>
                                        )
                                    })
                                    : null}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td style={{marginTop:"10px"}}>Sub Total:</td>
                                        <td>${this.state.grand}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Tax:</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Total:</td>
                                        <td></td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Report;