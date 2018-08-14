const express = require("express");
const router = express.Router();

router.post("/new-product", (req, res)=>{
    console.log(req.body)
    res.send("okay");
})

module.exports = router;