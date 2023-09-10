import { Box, Card, CardContent, Typography, Button } from "@mui/material"
import './ProductCard.css'

const ProductCard = ({ prod, changeProdInCart }) => {

   return (
      <Box width='20rem'>
         <Card>
            <CardContent>
               <img src={prod.image} alt='NA' />
               <Typography gutterBottom variant="h6" component='div'>{prod.name}</Typography>
               <Typography gutterBottom >MRP: Rs {prod.price}</Typography>
               {!prod.cart ? <Button variant="outlined" onClick={() => changeProdInCart(prod._id, 1)}>Add</Button> : <Button variant="contained" color='error' onClick={() => changeProdInCart(prod._id, 0)}>Remove</Button>}
            </CardContent>
         </Card>
      </Box>
   )
}

export default ProductCard