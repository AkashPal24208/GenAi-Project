import axios from "axios"

 const api = axios.create({
    baseURL:"http://localhost:3001",
    withCredentials:true 
})

 // register connection 
export async function register({username,email,password}){
     
    try{
      const response = await api.post('/api/auth/register',{
        username,email,password
    });
    return response.data
    } 
    catch(err){
        console.log(err);
    }
   
}

// login connection
export async function login({email,password}){

    try{
        const response  = await api.post("/api/auth/login",{
              email,password},
            {withCredentials:true}
        )
     
              return response.data
       } 
     catch(err){
        console.log(err);
    }
}

// logout 'get' connection 

export async function logout(){
        
    try{
      
        const response = await api.post("/api/auth/logout") 
        return response.data
    } 
    catch(err){
        console.log(err);
    }
}

// get-me connection 
export async function getme(){
    try{
       const response = await api.get("/api/auth/get-me")
     
       return response.data
    } 
    catch(err){
        console.log("error in fetching current user :",err);
        throw err;
    }
 
}

export const googleLogin = async (code) => {
    try {
        const response = await api.post('/api/auth/google', { code });
        return response.data;
    } catch (error) {
        throw error;
    }
};


