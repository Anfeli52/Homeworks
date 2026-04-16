import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ExplorerProvider } from "./context/ExplorerContext"
import { LoginPage } from "./pages/LoginPage"
import { PublicRoute } from "./components/PublicRoute"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Navbar } from "./components/Navbar"
import { Explorer } from "./pages/Explorer"
import { RegisterPage } from "./pages/RegisterPage"

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>

        <Navbar />

        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/explorer" element={
              <ExplorerProvider>
                <Explorer />
              </ExplorerProvider>
              } />
          </Route>
          
          <Route path='/' element={<Navigate to='/login' replace />}></Route>
          <Route path="*" element={<h2>404 - No tienes permiso o la página no existe</h2>} />
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
