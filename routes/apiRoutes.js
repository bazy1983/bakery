const express = require("express");
const router = express.Router();
const db = require("../models");

let Op = db.sequelize.Op;

function firstOfCurrentMonth() {
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1)
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
    console.log(req.body)
    db.Order.create(req.body)
        .then(() => {
            res.status(200).end();
        })
        .catch((err) => {
            console.error(err)
        })
})

router.delete("/record-by-id/:id", (req, res)=>{
    db.Order.destroy({
        where : req.params
    })
        .then(()=>{
            res.status(200).end();
        })
})

router.get("/records/:invoiceId", (req, res) => {
    // console.log(req.params)
    db.Order.findAll({
        where: {
            invoiceId: req.params.invoiceId
        },
        include: [
            { model: db.Business },
            { model: db.Product }
        ]
    })
        .then((records) => {
            res.json(records)
        })
})

// counts all invoices in BD and generate a count as new invoice number
router.get("/generate-invoice-number", (req, res) => {
    db.Invoice.findAndCountAll()
        .then((data) => {
            res.json({ count: data.count })
        })
})

router.post("/open-invoice", (req, res) => {
    console.log(req.body)
    db.Invoice.findOrCreate({
        where: { number: req.body.number },
        defaults: { BusinessId: req.body.businessId }
    })
        .spread((invoice, created) => {
            if (!created) { // if record exists
                db.Invoice.update(
                    { BusinessId: req.body.businessId },
                    { where: { number: req.body.number } }
                )
                    .then((invoice) => {
                        return
                    })
            }
            res.json(invoice);
        })
})

router.get("/all-invoices", (req, res) => {
    db.Invoice.findAll({
        where: {
            number: {
                [db.Sequelize.Op.regexp]: req.query.query
            }
        },
        include: [
            db.Business,
            {
                model: db.Order,
                include: [{
                    model: db.Product,
                }]
            }],
        order: [["id", req.query.sort]]
    })
        .then((invoices) => {
            res.json(invoices)
        })
});

router.get("/oneInvoice/:id", (req, res) => {
    db.Invoice.findOne({
        where: { id: req.params.id },
        include: [
            db.Business,
            {
                model: db.Order,
                include: [db.Product]
            }
        ]
    })
        .then((invoice) => {
            res.json(invoice)
        })
})

//get all sales for the year grouped by months
router.get("/sales", (req, res) => {
    
    let currentYear = typeof req.query.period === "string" ? req.query.period : req.query.period.toString();
    let nextYear = parseInt(currentYear)+1
    nextYear = nextYear.toString();
    db.Order.findAll({
        where : {
            createdAt : {
                [Op.between]: [new Date(currentYear), new Date(nextYear)]
            }
        },
        attributes : [
            "id",
            "total",
            "createdAt",
            [db.sequelize.fn("MONTH", db.sequelize.col("createdAt")), "month"],
            [db.sequelize.fn("SUM", db.sequelize.col("total")), "grandTotal"]
        ],
        group : "month"
    
    })
        .then((invoices) => {
            res.json(invoices)
        })
})

router.get("/product-sale", (req, res)=>{
    let currentYear = (new Date().getFullYear()).toString(); 
    let nextYear = (parseInt(currentYear) + 1).toString();


    db.Order.findAll({
        where : {
            createdAt : {
                [Op.between]: [new Date(currentYear), new Date(nextYear)]
            }
        },
        attributes : [
            "id" , "total", "productId",
            [db.sequelize.fn("SUM", db.sequelize.col("total")), "productTotal"]
        ],
        include : [db.Product],
        group : "productId"
    })
        .then((productSale)=>{
            console.log(productSale)
            res.json(productSale)
        })
})
// router.get("/count-and-sum-orders", (req, res)=>{
//     db.Order.findAll({
//         attributes : {include : [
//             [db.sequelize.fn("COUNT", db.sequelize.col("invoice")), "num"],
//             [db.sequelize.fn("SUM", db.sequelize.col("total")), "final"]
//         ]},
//         group : "invoice",
//         include : [{model : db.Business}]
//     })
//         .then((invoices)=>{
//             res.json(invoices)
//         });
// })

module.exports = router;