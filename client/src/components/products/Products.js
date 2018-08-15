import React, { Component } from "react";
import API from "../../API/api";
import "./products.css"

class Products extends Component {
    state = {
        products: "",
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
        let buttonText = document.querySelector(`#edit${recordId}`)
        let inputEl = document.querySelectorAll(`#record${recordId} input`);

        if (buttonText.textContent === "Edit") {
            buttonText.textContent = "Cancel"
            inputEl.forEach((el) => {
                el.classList.remove("hidden")
            });
            // document.querySelector(`#recordID${recordId}`).classList.add("hidden");
            document.querySelector(`#name${recordId}`).classList.add("hidden");
            document.querySelector(`#price${recordId}`).classList.add("hidden");
            document.querySelector(`#accept${recordId}`).classList.remove("hidden");
        } else {
            buttonText.textContent = "Edit"
            inputEl.forEach((el) => {
                el.classList.add("hidden")
            });
            // document.querySelector(`#recordID${recordId}`).classList.remove("hidden");
            document.querySelector(`#name${recordId}`).classList.remove("hidden");
            document.querySelector(`#price${recordId}`).classList.remove("hidden");
            document.querySelector(`#accept${recordId}`).classList.add("hidden");
        }
    }

    EditHandler = () => {

    }

    SearchHandler= (e) => {
        if(e.target.value){
            API.searchProduct(e.target.value)
                .then((products)=> {
                    this.setState({products : products.data})
                })
        }else {
            this.getProducts();
        }
    }

    render() {
        return (
            <div>
                <div className="left">
                    This is an inline input field:
                    <div className="input-field inline">
                        <input id="search" type="text" onChange={this.SearchHandler} />
                        <label htmlFor="search">Search</label>
                    </div>
                </div>
                <table className="striped">
                    <thead className="blue-grey darken-3 white-text">
                        <tr>
                            <th style={{ width: "10%", textAlign: "center" }}>#</th>
                            <th style={{ width: "35%" }}>Product name</th>
                            <th style={{ width: "35%" }}>Product Price</th>
                            <th style={{ width: "20%", textAlign: "center" }}>Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.products ?
                            this.state.products.map((product) => {
                                return (
                                    <tr key={product.id} id={"record" + product.id}>
                                        <td className="center-align"><span id={"recordID" + product.id}>{product.id}</span></td>
                                        <td><span id={"name" + product.id}>{product.name}</span> <input id={"nameEdit" + product.id} type="text" className="hidden" defaultValue={product.name} /></td>
                                        <td><span id={"price" + product.id}>{product.price}</span> <input id={"priceEdit" + product.id} type="text" className="hidden" defaultValue={product.price} /></td>
                                        <td className="center-align">
                                            <button id={"edit" + product.id} onClick={this.editToggler.bind(this, product.id)} className="btn waves-effect waves-light">Edit</button>
                                            <button id={"accept" + product.id} className="btn waves-effect waves-light hidden">Accept</button>
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