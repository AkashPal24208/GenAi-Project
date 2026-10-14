import { useAuth } from "../hooks/useAuth";
import {Navigate} from "react-router"
import React from 'react'

const Protected = ({children}) => {
    const {loading,user } = useAuth()
  
  if (loading) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center gap-3 text-zinc-900 font-sans">
        <svg className="w-6 h-6 animate-spin text-zinc-900" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <h1 className="text-sm font-medium text-zinc-600 tracking-tight">Loading your page...</h1>
      </main>
    )
  }
// agr user exist nhi kr rha to usko login per navigate karao
if(!user){
 return <Navigate to={'/login'} />
}

  return children
}

export default Protected
