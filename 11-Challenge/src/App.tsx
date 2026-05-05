import { ProductSearch } from './components/SearchBar'
import { products } from './data/productData';

function App() {

  return (
    <div className="app-wrapper">  
      <main className="app-content">
        <ProductSearch data={products}/>
      </main>
    </div>
  )
}

export default App
