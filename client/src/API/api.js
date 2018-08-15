import axios from "axios";

const API = {
    addProduct : (product, price)=>{
        return axios.post("/api/new-product", {
            name : product,
            price : price
        })
    },
    allProducts : ()=>{
        return axios.get("/api/all-products")
    },
    searchProduct: (product)=>{
        return axios.get("/api/product/" + product)
    }
}

export default API;