import Display from "./content/Display"
import Login from "./page/Login"
import Signup from './page/Signup'
import NotFound from "./page/NotFound"

import MainLayout from "./layout/MainLayout"
import AuthLayout from "./layout/AuthLayout"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminPage from "./page/AdminPage"

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Display />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  )
}

export default App
