
import {useContext,useEffect} from "react";
import { AuthContext } from "../auth.context";
import {login,register,logout,getme,googleLogin} from "../services/auth.api";

export const useAuth = ()=>{
    const context  = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within AuthProvider");
    }
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
   // ⭐ NEW: Add this handler for Google Login
    const handleGoogleLogin = async (code) => {
        setLoading(true);
        try {
            const data = await googleLogin(code);
            setUser(data.user); // Yahan user set ho jayega
            return data;
        } catch (err) {
            console.log("Error during Google login:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    // register function 
    const handleRegister = async ({username,email,password}) =>{
        setLoading(true)
        try{
        const data = await register({username,email,password})
        setUser(data.user)
        } catch(err){    
          console.log("Error while registering user:",err);
          throw err;
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
     * @description getAnd set User  on page load and refresh
     */
  

useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getme();
                setUser(data.user);
            } catch (err) {
                // 👈 Yeh wala update yahan lagana hai
                console.log("Auto-login failed:", err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };
        getAndSetUser();
    }, []);

return {user, loading, setUser, handleRegister, handleLogin, handleGoogleLogin, handleLogout}}
