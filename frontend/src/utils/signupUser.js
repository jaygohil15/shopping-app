import axios from "axios"

const signupUser = async (name, email, password) => {
   try {
      const res = await axios.post(process.env.REACT_APP_REGISTER, { name: name, email: email, password: password })
      return res.data;
   } catch (err) {
      return err.response.data
   }
}

export default signupUser