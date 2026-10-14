import {createBrowserRouter} from "react-router-dom";

import Login from "./features/auth/page/login";
import Register from "./features/auth/page/register";
import Protected from "./features/auth/components/Protected";
import Dashboard from "./features/auth/page/ActualHome"
import Interview from "./features/interview/pages/interview";
import Layout from "./Layout";
import Report from "./features/interview/pages/Home";
import ErrorPage from "./features/auth/page/ErrorPage";
import PastReport from "./features/auth/page/PastReport";
import Resume from "./features/interview/pages/Resume";
export const router  = createBrowserRouter([
      {
        element:<Layout/>,
       children:[
        {
     path:"*",
     element:<ErrorPage/>
        },
        {
       path:"/",
       element:<Protected><Dashboard/></Protected>
        },
     {
        path:"/login",
        element:<Login/>
    },
    {
       path:"/register",
       element:<Register/>
    },
    {
        path:"/gen-report",
        element:<Protected><Report/></Protected>
    },
    {
    path:"/past-report",
    element:<Protected><PastReport/></Protected>
    }, 
    {
    path:"/create-resume",
    element:<Protected><Resume/></Protected>
    },
    
    {
        path:"/interview/:interviewId",
        element:<Protected><Interview/></Protected>
    }
    ]
}
])