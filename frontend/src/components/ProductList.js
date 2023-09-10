
import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ prodList, changeProdInCart }) => {

   return (
      <div className='product-container'>
         {prodList ? prodList.map((prod, index) => {
            return (
               <React.Fragment key={index}>
                  <ProductCard prod={prod} changeProdInCart={changeProdInCart} />
               </React.Fragment>
            )
         }) : null}
      </div>
   )
}

export default ProductList;