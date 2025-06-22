import Display from "./content/Display"
import Login from "./page/Login"
import Signup from './page/Signup'

import MainLayout from "./layout/MainLayout"
import AuthLayout from "./layout/AuthLayout"

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"

function App() {

  return (
    <Router>
      
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Display />}></Route>
        </Route>
        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
