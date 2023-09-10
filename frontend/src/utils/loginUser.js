import axios from "axios"

const loginUser = async (email, password) => {

   try {
      const res = await axios.post('http://localhost:9000/api/user/login', { email: email, password: password })
      return res.data;
   } catch (err) {
      return err.response.data
   }
}

export default loginUser