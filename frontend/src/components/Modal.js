import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Alert, AlertTitle } from '@mui/material'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import signupUser from '../utils/signupUser'
import loginUser from '../utils/loginUser';

const Modal = memo(({ isDialogOpen, handledialogOpen, isLogin, setUserName, setIsLoggedIn }) => {

   useEffect(() => {
      console.log('Modal re-rendered')
   })

   const [isSuccess, setIsSuccess] = useState(null);
   const [errText, setErrText] = useState('Error')

   const emailRef = useRef();
   const passwordRef = useRef();
   const nameRef = useRef();

   isLogin === 'true' ? isLogin = true : isLogin = false;
   let btnText = isLogin ? 'Login' : 'Signup';

   const handledialogClose = useCallback(() => {
      handledialogOpen();
      setIsSuccess(null)
   }, [])

   const handleUserActivity = useCallback(async () => {
      try {
         console.log(emailRef.current.value)
         let res;
         if (isLogin) {
            res = await loginUser(emailRef.current.value, passwordRef.current.value)
         } else {
            res = await signupUser(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
         }
         console.log(typeof res.success)
         if (res.success) {
            setIsLoggedIn(true)
            setUserName(res.user.name)
            setIsSuccess(true)
         } else {
            setIsSuccess(false)
            setErrText(res.message)
         }
      } catch (err) {
         console.log(err)
      }

   }, [])

   const showMessage = useCallback(() => {
      if (isSuccess === false) {
         return (<Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errText}<strong> check it out!</strong>
         </Alert>)
      } else if (isSuccess === true) {
         return (
            <Alert severity="success">
               <AlertTitle>Success</AlertTitle>
               Successful {btnText}
            </Alert>
         )
      } else {
         return null;
      }
   }, [btnText, errText, isSuccess])

   return (
      <Dialog open={isDialogOpen} onClose={handledialogClose}>
         <DialogTitle>{btnText}</DialogTitle>
         <DialogContent>
            {isLogin ? null : <TextField
               autoFocus
               margin="dense"
               id="name"
               label="Name"
               type="text"
               fullWidth
               variant="standard"
               inputRef={nameRef}
            />}
            <TextField
               autoFocus
               margin="dense"
               id="email"
               label="Email Address"
               type="email"
               fullWidth
               variant="standard"
               inputRef={emailRef}
            />
            <TextField
               autoFocus
               margin="dense"
               id="password"
               label="Password"
               type="password"
               fullWidth
               variant="standard"
               inputRef={passwordRef}
            />
         </DialogContent>
         {showMessage()}
         <DialogActions sx={{ justifyContent: 'center' }}>
            <Button onClick={handleUserActivity}>{btnText}</Button>
         </DialogActions>
      </Dialog>
   )
})

export default Modal