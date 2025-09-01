import './App.css'
import { CartProvider } from './context/CartContext'
import { Header } from './components/Header/Header'
import ProductListPage from './components/pages/ProductListPage.tsx/ProductListPage'

function App() {

  return (
    <>
      <CartProvider>
        <Header />
        <ProductListPage />
      </CartProvider>
    </>
  )
}

export default App
