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
    },
    editProduct : (id, product, price)=>{
        console.log(id, product, price)
        return axios.put("/api/edit-product", {
            id : id,
            name : product,
            price : price
        })
    }
}

export default API;