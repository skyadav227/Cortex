import React from 'react'
import Home from './Pages/Home'
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Landingpage from './Pages/Landingpage'
import ProtectedRoute from './Components/protectedRoute'
import { Toaster } from 'sonner'

export default function App() {

  const location = useLocation()

  return (
    <>
      <Toaster richColors position="top-right" />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  )
}