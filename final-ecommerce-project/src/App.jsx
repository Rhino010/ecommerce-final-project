import './App.css'
import Products from './components/Products'
import CustomerList from './components/CustomerList'
import CustomerForm from './components/CustomerForm'
import ProductList from './components/ProductDetails'
import { Route, Routes } from 'react-router-dom';
import OrderForm from './components/OrderForm'
import NavigationBar from './components/NavigationBar'
import NotFound from './components/NotFound'
import HomePage from './components/HomePage'
import ProductForm from './components/ProductForm'


function App() {

  return (
    <>
    <NavigationBar />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/products' element={<ProductList />} />
        <Route path="/order-form/:id" element={<OrderForm />} />
        <Route path='/customers' element={<CustomerList />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/add-product' element={<ProductForm />} />
        <Route path='/add-product/:id' element={<ProductForm/>} />
      </Routes>
    </>
  )
}

export default App
