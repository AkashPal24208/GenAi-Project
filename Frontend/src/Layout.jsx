import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './features/auth/components/Navbar'
const Layout = () => {
  return (
  <>
   <Navbar/>
   <Outlet/>
  </>
  )
}

export default Layout
