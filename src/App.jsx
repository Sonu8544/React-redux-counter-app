import './App.css'
import CartPage from './component/CartPage'
import Counter from './component/Counter'
import FetchProductData from './component/FetchProductData'

function App() {

  return (
    <>
      <CartPage />
      <h1 className="text-3xl font-bold text-center">
        Wellness Extract!
      </h1>
      {/* <Counter /> */}
      <FetchProductData />
    </>

  )
}

export default App
