const router = require('express').Router()
const Product = require('../model/product')

router.post('/', async (req, res) => {
   const product = new Product({
      name: req.body.name,
      image: req.body.image,
      desc: req.body.desc,
      quantity: req.body.quantity,
      price: req.body.price,
      category: req.body.category,
   })
   try {
      const prod = await product.save()
      res.json({
         success: true,
         data: prod
      })
   } catch (err) {
      res.status(400).json({
         success: false,
         message: err
      })
   }
})

router.get('/', async (req, res) => {
   try {
      if (req.query.category) {
         // console.log(req.query)
         const categoryWiseProd = await Product.find({ category: req.query.category })
         if (categoryWiseProd.length === 0) {
            req.status(404).json({
               success: false,
               message: 'No product found for specified category'
            })
         }
         res.send(categoryWiseProd)

      } else if (req.query.search) {
         // console.log(req.query)
         const prod = await Product.find({ name: new RegExp(req.query.search, 'i') })

         if (prod.length === 0) {
            req.status(404).json({
               success: false,
               message: 'No product found for specified search term'
            })
         }
         res.send(prod)
      } else {
         const allProduct = await Product.find()
         res.send(allProduct)
      }
   } catch (err) {
      res.status(400).json({
         success: false,
         message: err
      })
   }
})

module.exports = router