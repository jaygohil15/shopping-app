import axios from "axios";

const fetchProducts = async () => {

   try {
      const res = await axios.get('http://localhost:9000/api/product')
      return res.data
   } catch (err) {
      return err.response.data
   }
}

export default fetchProducts;