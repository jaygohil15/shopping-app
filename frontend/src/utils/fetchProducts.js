import axios from "axios";

const fetchProducts = async () => {

   try {
      const res = await axios.get(process.env.REACT_APP_PRODUCT)
      return res.data
   } catch (err) {
      return err.response.data
   }
}

export default fetchProducts;