
import Router from './Routes.tsx'
import './App.css'
import Shelve from './components/Shelve'
import Navbar from './components/Navbar'
import { Product } from './logic/classes/product'

function App() {
  
  const productsInShelve = [
    new Product("apple", 10, "apple"),
    new Product("apple", 10, "apple"),
  ]

  return (
      <div className='App'>
      <Router />
      <Navbar />
      <Shelve width={50} height={200} top={'100px'} left={'200px'} backgroundColor="gray" productsInShelve={productsInShelve} />
      </div>
  )
}

export default App
