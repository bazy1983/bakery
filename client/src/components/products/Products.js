import React, { Component } from "react";
import API from "../../API/api";

class Products extends Component {
    createProduct = () => {
        let product = document.querySelector("#product").value;
        let price = document.querySelector("#price").value;
        if (product && price){
            API.addProduct(product, price)
        }
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
                    <tr>
                        <td>1</td>
                        <td>Eclair</td>
                        <td>$0.87</td>
                        <td><button className="btn waves-effect waves-light">Add</button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jellybean</td>
                        <td>$3.76</td>
                        <td><button className="btn waves-effect waves-light">Add</button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                        <td><button className="btn waves-effect waves-light">Add</button></td>
                    </tr>
                    <tr>
                        <td><button onClick={this.createProduct} className="btn waves-effect waves-light">Add</button></td>
                        <td><input id="product" type="text" placeholder="add new procdut" required/></td>
                        <td><input id="price" type="number" required/></td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Products;