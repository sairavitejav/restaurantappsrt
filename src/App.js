import {useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])

  const addCartItems = dish => {
    const isAlreadyExist = cartList.find(item => item.dishId === dish.dishId)
    if (isAlreadyExist) {
      setCartList(prevCartList =>
        prevCartList.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + dish.quantity}
            : item,
        ),
      )
    } else {
      setCartList(prevCartList => [...prevCartList, dish])
    }
  }

  const removeCartItem = dishId => {
    const filteredList = cartList.filter(item => item.dishId !== dishId)
    setCartList(filteredList)
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const incrementCartItemQuantity = dishId => {
    setCartList(prevCartList =>
      prevCartList.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    setCartList(prevCartList =>
      prevCartList
        .map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  return (
    <BrowserRouter>
      <CartContext.Provider
        value={{
          cartList,
          addCartItems,
          removeCartItem,
          removeAllCartItems,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </CartContext.Provider>
    </BrowserRouter>
  )
}
export default App
