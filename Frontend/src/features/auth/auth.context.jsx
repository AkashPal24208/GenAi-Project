import { useEffect } from "react";
import { createContext,useState} from "react";
import { getme } from "./services/auth.api"; 

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
 // will store user data 
 // and load ho  rha hai ki nhi 

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
     
     useEffect(()=>{
          const fetchUser = async ()=>{
            try{
             const data = await getme(); // fetch user on the basis of cookies 
             setUser(data.user);
            }
            catch(err){
              setUser(null);
            }
            finally{
              setLoading(false);
            }
          };
          fetchUser();
     },[]);

      return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
           { children}
        </AuthContext.Provider>
      )
}