const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   desc: {
      type: String,
   },
   quantity: {
      type: Number,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   category: {
      type: String,
      required: true
   }
})

module.exports = mongoose.model('Product', productSchema)