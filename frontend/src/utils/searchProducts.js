import axios from "axios"

const searchProducts = async (searchTerm) => {

   try {
      const res = await axios.get(`http://localhost:9000/api/product?search=${searchTerm}`)
      return res.data;
   } catch (err) {
      return err.response.data
   }
}

export default searchProducts