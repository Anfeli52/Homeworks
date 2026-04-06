import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className='App'>
          <Navbar />

          <Routes>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
            
            <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<Home />}></Route>
            </Route>

            <Route path='/' element={<Navigate to='/login' replace />}></Route>
            <Route path="*" element={<h2>404 - No tienes permiso o la página no existe</h2>} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
