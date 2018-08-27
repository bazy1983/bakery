const express = require("express");
const router = express.Router();
const db = require("../models");

function firstOfCurrentMonth() {
    return new Date(new Date().getFullYear(),new Date().getMonth() , 1)
}

router.post("/new-product", (req, res) => {
    db.Product.create(req.body)
        .then(() => {
            res.status(200).end();
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get("/all-products", (req, res) => {
    db.Product.findAll({})
        .then((products) => {
            res.json(products)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get("/product/:name", (req, res) => {
    db.Product.findAll({
        where: {
            name: {
                [db.Sequelize.Op.regexp]: req.params.name
            }
        }
    })
        .then((products) => {
            // console.log(products)
            res.json(products)
        })
        .catch((err) => {
            console.log(err);
        })
})

router.put("/edit-product", (req, res) => {
    db.Product.update({
        name: req.body.name,
        price: req.body.price
    },
        {
            where: { id: req.body.id }
        })
    console.log(req.body)
    res.send("ok")
})

router.post("/new-business", (req, res) => {
    // console.log(req.body)
    db.Business.create(req.body)
        .then((business) => {
            console.log(business)
            res.send("okay")
        })
})

router.get("/all-businesses", (req, res) => {
    db.Business.findAll({})
        .then((businesses) => {
            res.json(businesses)
        })
        .catch((err) => {
            console.error(err)
        })
})

router.get("/invoices-of-day", (req, res) => {
    db.Order.findAll({
        where: {

        }
    })
})

router.post("/invoice-record", (req, res) => {
    db.Order.create(req.body)
        .then(() => {
            res.status(200).end();
        })
})

router.get("/records/:invoice", (req, res) => {
    // console.log(req.params)
    db.Order.findAll({
        where: {
            invoice: req.params.invoice
        },
        include : [
            {model : db.Business},
            {model : db.Product}
        ]
    })
        .then((records)=>{
            res.json(records)
        })
})

router.get("/count-and-sum-orders", (req, res)=>{
    db.Order.findAll({
        attributes : {include : [
            [db.sequelize.fn("COUNT", db.sequelize.col("invoice")), "num"],
            [db.sequelize.fn("SUM", db.sequelize.col("total")), "final"]
        ]},
        group : "invoice",
        include : [{model : db.Business}]
    })
        .then((invoices)=>{
            res.json(invoices)
        });
})

module.exports = router;