require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const productCrl = require('./products_controller')

const {SERVER_PORT, CONNECTION_STRING} = process.env

app.use(express.json())

app.post('/api/products', productCrl.create)
app.get('/api/products', productCrl.getAll)
app.get('/api/products/:product_id', productCrl.getOne)
app.put('/api/products/:product_id', productCrl.update)
app.delete('/api/products/:product_id', productCrl.delete)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    },
}).then(dbInstance => {
    console.log('DB ready')
    app.set('db', dbInstance)
    app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`))
})