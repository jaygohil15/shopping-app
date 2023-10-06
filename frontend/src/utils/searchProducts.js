import axios from "axios"

const searchProducts = async (searchTerm) => {

   try {
      const res = await axios.get(`${process.env.REACT_APP_PRODUCT}?search=${searchTerm}`)
      return res.data;
   } catch (err) {
      return err.response.data
   }
}

export default searchProducts