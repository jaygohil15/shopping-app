import axios from "axios"

const loginUser = async (email, password) => {

   try {
      const res = await axios.post(process.env.REACT_APP_LOGIN, { email: email, password: password })
      return res.data;
   } catch (err) {
      return err.response.data
   }
}

export default loginUser