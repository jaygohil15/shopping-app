
import { memo, useCallback, useState, useEffect } from 'react';

import { Autocomplete, TextField, FormControl, InputLabel, Select, MenuItem, Button, Badge, Typography, IconButton, Toolbar, AppBar } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import searchProducts from '../utils/searchProducts';
import Modal from './Modal'

function debounce(cb) {
   let timeoutId;
   return function (...args) {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
         cb(...args)
      }, 1000)
   }
}

const Navbar = memo(({ cartTotal, setCurrCategory, currCategory, setProdList, originalProdList }) => {

   const [inputOptions, setInputOptions] = useState([]);
   const [isSignupDialogOpen, setSignupDialogOpen] = useState(false);
   const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const [userName, setUserName] = useState('')

   useEffect(() => {
      console.log('Navbar re-rendered')
   })

   const handleSignupDialogOpen = useCallback(() => {
      setSignupDialogOpen(prev => !prev)
   }, [])

   const handleLoginDialogOpen = useCallback(() => {
      setLoginDialogOpen(prev => !prev)
   }, [])

   const changeCategory = useCallback((e) => {
      setCurrCategory(e.target.value)

      setProdList(prev => {
         return [...originalProdList.current.filter(val => {
            if (e.target.value === 'none') return true;
            return val.category === e.target.value
         }
         )]
      })
   }, [])

   const searchItem = useCallback(debounce(async (e) => {
      try {
         let res = await searchProducts(e.target.value)
         setInputOptions(res.map(val => val.name))
      } catch (err) {
         console.log(err)
      }
   }), [])

   return (
      <>
         <AppBar position='sticky' sx={{ backgroundColor: '#e0fbfc' }} >
            <Toolbar sx={{ backgroundColor: '#e0fbfc' }}>
               <ShoppingBagOutlinedIcon size='large' sx={{ color: '#3d5a80' }} />
               <Typography variant='h6' component='div' sx={{ color: '#3d5a80', flexGrow: 0.3 }}>Shopping App</Typography>

               <FormControl sx={{ width: '10rem', marginRight: '2rem' }}>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={currCategory}
                     label="Category"
                     onChange={changeCategory}
                  >
                     <MenuItem value='vegetables'>Vegetables</MenuItem>
                     <MenuItem value='fruits'>Fruits</MenuItem>
                     <MenuItem value='herbs'>Herbs & seasoning</MenuItem>
                     <MenuItem value='none'>None</MenuItem>
                  </Select>
               </FormControl>

               <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={inputOptions}
                  sx={{ flexGrow: 0.6 }}
                  renderInput={(params) => <TextField variant='standard' sx={{
                     width: '20rem'
                  }} placeholder='Search' {...params} onChange={searchItem} />}
                  popupIcon={null}
               >
               </Autocomplete>
               {isLoggedIn ? <Typography variant='h6' sx={{ color: '#3d5a80' }} >{userName}</Typography> : <><Button variant="outlined" onClick={handleSignupDialogOpen}>
                  Signup
               </Button>
                  <Button variant="outlined" onClick={handleLoginDialogOpen}>
                     Login
                  </Button></>}
               <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={cartTotal} color="error">
                     <ShoppingCartOutlinedIcon sx={{ color: '#3d5a80' }} />
                  </Badge>
               </IconButton>
            </Toolbar>
         </AppBar >
         <Modal setUserName={setUserName} setIsLoggedIn={setIsLoggedIn} isDialogOpen={isSignupDialogOpen} handledialogOpen={handleSignupDialogOpen} isLogin='false' />
         <Modal setUserName={setUserName} setIsLoggedIn={setIsLoggedIn} isDialogOpen={isLoginDialogOpen} handledialogOpen={handleLoginDialogOpen} isLogin='true' />
      </>
   )

})

export default Navbar