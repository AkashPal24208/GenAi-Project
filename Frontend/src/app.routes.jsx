import {createBrowserRouter} from "react-router-dom";

import Login from "./features/auth/page/login";
import Register from "./features/auth/page/register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/interview";
export const router  = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
       path:"/register",
       element:<Register/>
    },
    {
        path:"/",
        element:<Protected><Home/></Protected>
    },
    {
        path:"/interview/:interviewId",
        element:<Protected><Interview/></Protected>
    }
])