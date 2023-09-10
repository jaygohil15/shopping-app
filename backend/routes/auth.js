const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const { registerValidation, loginValidation } = require('../validation')

router.post('/register', async (req, res) => {

   //Validating before saving
   const { error } = registerValidation(req.body)
   if (error) return res.status(400).json({
      success: false,
      message: error.details[0].message
   })

   // Checking duplicate email
   const emailExist = await User.findOne({ email: req.body.email })
   console.log(emailExist)
   if (emailExist) return res.status(400).json({
      success: false,
      message: 'Email already exists...'
   })

   // Hashing Password
   const salt = await bcrypt.genSalt(10)
   const hashPassword = await bcrypt.hash(req.body.password, salt)

   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
   })
   try {
      const savedUser = await user.save()
      res.status(200).json({ success: true, user: savedUser })
   } catch (err) {
      res.status(400).json({
         success: false,
         message: err.message
      })
   }
})

router.post('/login', async (req, res) => {
   // Validating before searching
   const { error } = loginValidation(req.body)
   if (error) return res.status(400).json({
      success: false,
      message: error.details[0].message
   })

   // Checking if email exist
   const user = await User.findOne({ email: req.body.email })
   if (!user) return res.status(404).json({
      success: false,
      message: 'Email doesn\'t exist...'
   })

   // Checking Password
   const validPass = await bcrypt.compare(req.body.password, user.password)
   if (!validPass) return res.status(400).json({
      success: false,
      message: 'Invalid Password'
   })

   // Create and assign token
   const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
   res.header('auth-token', token).send({ success: true, user: user, token: token })
})

module.exports = router