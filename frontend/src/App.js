import { useCallback, useEffect, useRef, useState } from 'react';

import Navbar from './components/Navbar'
import ProductList from './components/ProductList';
import fetchProducts from './utils/fetchProducts'

function App() {

  const [cartTotal, setCartTotal] = useState(0);
  const [currCategory, setCurrCategory] = useState('none')
  const [prodList, setProdList] = useState(null);

  const originalProdList = useRef();

  useEffect(() => {
    async function anon() {
      try {
        const res = await fetchProducts()
        setProdList(res)
        originalProdList.current = [...res]
      } catch (err) {
        console.log(err)
      }
    }
    anon();

  }, [])

  const changeProdInCart = useCallback((id, cnt) => {
    setProdList(prev => {

      for (let i of prev) {
        if (i._id === id) {
          i.cart = cnt;
          setCartTotal(prev => {
            if (cnt) return prev + 1
            else return prev - 1
          })
        }
      }
      return [...prev];
    })
  }, [])

  return (
    <div className="App">
      <Navbar cartTotal={cartTotal} currCategory={currCategory} setCurrCategory={setCurrCategory} setProdList={setProdList} originalProdList={originalProdList} />
      <ProductList setCartTotal={setCartTotal} changeProdInCart={changeProdInCart} prodList={prodList} />
    </div>
  );
}

export default App;
