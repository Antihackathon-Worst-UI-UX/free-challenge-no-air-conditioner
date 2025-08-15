import './App.css'
import Shelve from './components/shelve'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Shelve width={50} height={200} top={'50%'} left={'50%'} backgroundColor="gray" />
    </>
  )
}

export default App
