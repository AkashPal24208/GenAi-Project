import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import {InterviewProvider} from "./features/interview/interview.context.jsx"
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {


  return (
  <GoogleOAuthProvider clientId="654164841097-2aab7o3fol2hdakcepa0k8b53vfoef6o.apps.googleusercontent.com"> 
        <AuthProvider>
      <InterviewProvider>
       <RouterProvider router={router}/>
    </InterviewProvider>
    </AuthProvider>
  </GoogleOAuthProvider>

 
  )
}

export default App
