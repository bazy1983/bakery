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
                console.log(products.data)
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
    editHandler = (recordId) => {
        let inputEl = document.querySelectorAll(`#record${recordId} input`);
        inputEl.forEach((el)=>{
            el.classList.remove("hidden")
        })
        document.querySelector(`#name${recordId}`).classList.add("hidden");
        document.querySelector(`#price${recordId}`).classList.add("hidden");
    }

    render() {
        return (
            <table className="striped">
                <thead className="blue-grey darken-3 white-text">
                    <tr>
                        <th>#</th>
                        <th>Product name</th>
                        <th>Product Price</th>
                        <th>Edit</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.products ?
                        this.state.products.map((product) => {
                            return (
                                <tr key={product.id} id={"record"+product.id}>
                                    <td>{product.id}</td>
                                    <td><span id={"name"+product.id}>{product.name}</span> <input type="text" className="hidden" defaultValue={product.name}/></td>
                                    <td><span id={"price"+product.id}>{product.price}</span> <input type="text" className="hidden" defaultValue={product.price}/></td>
                                    <td><button onClick={this.editHandler.bind(this, product.id)} className="btn waves-effect waves-light">Edit</button></td>
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
        )
    }
}

export default Products;