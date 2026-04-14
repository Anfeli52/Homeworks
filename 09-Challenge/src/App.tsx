import { Routes, Route } from 'react-router-dom'
import { root } from "./data/menuData"
import { Menu } from "./pages/Menu"
import { Home } from "./pages/Home"
import { Peliculas } from "./pages/Peliculas"
import { Estrenos } from "./pages/Estrenos"
import { Preventa } from "./pages/Preventa"
import { Dulceria } from "./pages/Dulceria"
import { Promociones } from "./pages/Promociones"
import "./App.css"
function App() {
  return (
    <>
      <Menu root={root} />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cartelera/accion" element={<Peliculas />} />
          <Route path="/cartelera/terror" element={<Peliculas />} />
          <Route path="/cartelera/animacion" element={<Peliculas />} />
          <Route path="/estrenos" element={<Estrenos />} />
          <Route path="/preventas" element={<Preventa />} />
          <Route path="/dulceria/combos" element={<Dulceria />} />
          <Route path="/dulceria/snacks" element={<Dulceria />} />
          <Route path="/club" element={<Promociones />} />
          <Route path="/promos/bancos" element={<Promociones />} />
        </Routes>
      </main>
    </>
  )
}

export default App
