import {createBrowserRouter} from "react-router-dom";

import Login from "./features/auth/page/login";
import Register from "./features/auth/page/register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/interview";
import Layout from "./Layout";
import { children } from "react";
import ActualHome from "./features/auth/page/ActualHome";
import ErrorPage from "./features/auth/page/ErrorPage";
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
       element:<ActualHome/>
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
        element:<Protected><Home/></Protected>
    },
    {
        path:"/interview/:interviewId",
        element:<Protected><Interview/></Protected>
    }
    ]
}
])