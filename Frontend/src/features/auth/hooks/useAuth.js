
import {useContext,useEffect} from "react";
import { AuthContext } from "../auth.context";
import {login,register,logout,getme} from "../services/auth.api";

export const useAuth = ()=>{
    const context  = useContext(AuthContext)
    const {user,setUser,loading,setLoading } = context
    
    // this function handle the loading part during login
    const handleLogin = async ({email,password})=>{
        setLoading(true)  
        try{
        const data =  await login({email,password}) // es data ke inside user bhi rahega
        setUser(data.user)
        } 
        catch(err){
        // error handling part
        }
        finally{
        setLoading(false)
        }
      
    }
 
    // register function 
    const handleRegister = async ({username,email,password}) =>{
        setLoading(true)
        try{
        const data = await register({username,email,password})
        setUser(data.user)
        } catch(err){    
        // error handling part
        }
        finally{
        setLoading(false)
        }
        
    }

    // logout function here no need to pass anything 
    const handleLogout = async () =>{
        setLoading(true)
        try{
        const data = await logout()
        setUser(null)
        } catch(err){
         // error handling part
        } 
        finally{
          setLoading(false)  // at last state ko false set kr diya.
        }
       
    }

    /**
     * @useEffect logic 
     * @description getAnd set User 
     */
     useEffect( ()=>{

     const getAndSetUser = async ()=>{
        try{
      const data = await getme()
      setUser(data.user)
        }catch(err){ } finally{
            setLoading(false)
        }
     }
     getAndSetUser();

   },[])

    return {user,loading,handleRegister,handleLogin,handleLogout}
}
