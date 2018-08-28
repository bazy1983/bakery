import axios from "axios";

const API = {
    addProduct: (product, price) => {
        return axios.post("/api/new-product", {
            name: product,
            price: price
        })
    },
    allProducts: () => {
        return axios.get("/api/all-products")
    },
    searchProduct: (product) => {
        return axios.get("/api/product/" + product)
    },
    editProduct: (id, product, price) => {
        // console.log(id, product, price)
        return axios.put("/api/edit-product", {
            id: id,
            name: product,
            price: price
        })
    },
    addBusiness: (businessData) => {
        return axios.post("/api/new-business", businessData)
    },
    getAllBusinesses: () => {
        return axios.get("/api/all-businesses")
    },
    invoiceRecord: (record) => {//creates records
        return axios.post("/api/invoice-record", record)
    },
    recordsforInvoice: (invoiceId) => {//get all records for invoiceId
        return axios.get("/api/records/" + invoiceId)
    },
    invoiceNumber : ()=>{
        return axios.get("/api/generate-invoice-number")
    },
    openInvoice: (businessID, invoiceNumber)=>{
        return axios.post("/api/open-invoice",{
            number : invoiceNumber,
            businessId : businessID
        })
    },
    allInvoices: ()=>{
        return axios.get("/api/all-invoices")
    }

}

export default API;