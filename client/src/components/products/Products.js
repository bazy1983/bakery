import React, { Component } from "react";
import API from "../../API/api";
import "./products.css"

class Products extends Component {
    state = {
        products: "",
        editMode: 0 //replaced by recordId
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = () => {
        API.allProducts()
            .then((products) => {
                // console.log(products.data)
                this.setState({ products: products.data })
            })
    }
    createProduct = () => {
        let product = document.querySelector("#product");
        let price = document.querySelector("#price");
        if (product && price) {
            API.addProduct(product.value.trim(), price.value.trim())
                .then(() => {
                    this.getProducts();
                    product.value = "";
                    price.value = "";
                })
        } else {
            console.log("fill in the blanks")
        }
    }
    editToggler = (recordId) => {
        if (this.state.editMode === recordId){
            this.setState({editMode : 0})
        } else {
            this.setState({editMode : recordId})
        }
    }

    editHandler = (recordId) => {
        let name = document.querySelector("#nameEdit" + recordId);
        let price = document.querySelector("#priceEdit" + recordId);
        if (name.value && price.value) {
            API.editProduct(recordId, name.value, price.value)
                .then(() => {
                    this.getProducts()
                    this.setState({editMode : 0})
                })
        }
    }

    SearchHandler = (e) => {
        if (e.target.value) {
            API.searchProduct(e.target.value)
                .then((products) => {
                    this.setState({ products: products.data })
                })
        } else {
            this.getProducts();
        }
    }

    render() {
        let editing = this.state.editMode;
        return (
            <div>
                <div className="left">
                    This is an inline input field:
                    <div className="input-field inline">
                        <input id="search" type="text" onChange={this.SearchHandler} />
                        <label htmlFor="search">Search</label>
                    </div>
                </div>
                <table className="striped z-depth-2">
                    <thead className="blue-grey darken-3 white-text">
                        <tr>
                            <th style={{ width: "10%", textAlign: "center" }}>#</th>
                            <th style={{ width: "35%" }}>Product name</th>
                            <th style={{ width: "30%" }}>Product Price</th>
                            <th style={{ width: "25%", textAlign: "center" }}>Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.products ?
                            this.state.products.map((product) => {
                                return (
                                    <tr key={product.id} id={"record" + product.id}>
                                        <td className="center-align"><span id={"recordID" + product.id}>{product.id}</span></td>
                                        <td>
                                            <span id={"name" + product.id} className={editing===product.id ? "hidden" : null}>{product.name}</span>
                                            <input id={"nameEdit" + product.id} type="text" className={editing===product.id ? null : "hidden"} defaultValue={product.name} />
                                        </td>
                                        <td>
                                            <span id={"price" + product.id} className={editing===product.id ? "hidden" : null}>{product.price}</span>
                                            <input id={"priceEdit" + product.id} type="text" className={editing===product.id ? null : "hidden"} defaultValue={product.price} />
                                        </td>
                                        <td className="center-align">
                                            <button id={"edit" + product.id} onClick={this.editToggler.bind(this, product.id)} className="btn waves-effect waves-light">{editing===product.id ? "Cancel" : "Edit"}</button>
                                            <button id={"accept" + product.id} onClick={this.editHandler.bind(this, product.id)} className={editing===product.id ? "btn waves-effect waves-light" : "btn waves-effect waves-light hidden"}>Accept</button>
                                        </td>
                                    </tr>
                                )
                            })
                            : null
                        }

                        <tr>
                            <td><button onClick={this.createProduct} className="btn waves-effect waves-light">Add</button></td>
                            <td><input id="product" type="text" placeholder="add new product" required /></td>
                            <td><input id="price" type="number" placeholder="add price" required /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Products;