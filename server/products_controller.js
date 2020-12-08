const { create } = require("domain")
const { Update } = require("massive")
const { getEnabledCategories } = require("trace_events")

module.exports = {
    create: (req, res)=>{
        const db = req.app.get('db')
        const{name, description, price, image_url} = req.body

        db.create_product([name, description, price, image_url]).then(product=>{
            res.status(200).send(product)
            .catch(err => {
                res.status(400).send(err)
            })
        })
    },
    getOne: (req, res)=>{
        const db = req.app.get('db')
        const {product_id} = req.params

        db.read_product([product_id]).then(product =>{
            res.status(200).send(product)
        })

    },
    getAll: (req, res)=>{
        const db = req.app.get('db')
        db.read_products().then(products => {
            res.status(200).send(products)
        })
    },
    update: (req, res)=>{
        const db = req.app.get('db')
        const{product_id} = req.params
        const{description} = req.body

        db.update_product([product_id, description]).then(product =>{
            res.status(200).send(product)
        }).catch(err => {
            res.status(400).send(err)
        })
    },
    delete: (req, res)=>{
        const db = req.app.get('db')
        const {product_id} = req.params

        db.delete_product([product_id]).then(() =>{
            res.sendStatus(200)
        })
    }
}