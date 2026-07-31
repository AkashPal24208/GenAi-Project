import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
// import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import "../css/Login.css"


const Login = () => {
    
  const {loading,handleLogin} = useAuth()

  const [email,setEmail]= useState("")
  const [password,setPassword] = useState("")
 

  const navigate = useNavigate();  

  const handleSubmit = async (e)=>{
    e.preventDefault()
    await handleLogin({email,password})
    navigate('/')
  }
 
 // jab loading ho rhi hai tab ye dikhana hai 
  if(loading){
    return (<main>
      <h1>Loading...... </h1>
    </main>)
  }

  return (
    <main>
 <div className="form-container">
         <h1>Login</h1>

        <form onSubmit={handleSubmit}>

   {/* for login details  */}
      <div className="input-group">
        <label htmlFor="email"><strong>Email:</strong></label>
        <input 
          onChange={(e)=>{setEmail(e.target.value)}}
        type="email" id="email" name="email" placeholder='Enter your email' />
      </div>

      {/* for password */}

       <div className="input-group">
        <label htmlFor="password"><strong>Password:</strong></label>
        <input 
        onChange={(e)=>{setPassword(e.target.value)}}
        type="password" id="password" name="password" placeholder='Enter your password' />
      </div>

        <button className='button primary-button'>Login</button>
        </form>

         <p>Don't have an account ? Create Account : <Link to={"/register"}>Register</Link></p>

</div>
    </main>
   
  )
}

export default Login
