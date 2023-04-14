const express = require('express')
const products = require('./routes/product')

const app= express();

app.use("/",products)

module.exports = app;