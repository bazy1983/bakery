const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/new-product", (req, res)=>{
    db.Product.create(req.body)  
        .then(()=>{
            res.status(200).end();
        })
        .catch((err)=>{
            console.log(err)
        })
})

router.get("/all-products", (req, res)=>{
    db.Product.findAll({})
        .then((products)=>{
            res.json(products)
        })
        .catch((err)=>{
            console.log(err)
        })
})

router.get("/product/:name", (req, res) => {
    db.Product.findAll({
        where : {
            name : {
                [db.Sequelize.Op.regexp] : req.params.name
            }
        }
    })
        .then((products)=>{
            // console.log(products)
            res.json(products)
        })
        .catch((err)=> {
            console.log(err);
        })
})
module.exports = router;