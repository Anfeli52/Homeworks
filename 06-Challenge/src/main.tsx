import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import "./Styles/login.css"
import { AuthProvider } from './Contexts/AuthProvider'
import Login from './Components/Login'
import ProtectedRout from './Components/ProtectedRoute'
import Home from './Components/Home'
import Library from './Components/Library'
import ATM from './Components/ATM'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>

          <Route element={<ProtectedRout/>}>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/library' element={<Library/>}></Route>
            <Route path='/atm' element={<ATM/>}></Route>
          </Route>

          <Route path='*' element={<Navigate to="/login"/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
