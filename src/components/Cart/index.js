import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import Header from '../Header'
import CartItems from '../CartItems'
import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const onRemoveAll = () => {
    removeAllCartItems()
  }

  return (
    <div>
      <Header />
      {cartList.length === 0 ? (
        <div className="empty">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="cart empty"
          />
        </div>
      ) : (
        <div>
          <div className="remove-container">
            <button onClick={onRemoveAll} type="button" className="remove-btn">
              Remove All
            </button>
          </div>
          <ul>
            {cartList.map(item => (
              <CartItems item={item} key={item.dishId} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default Cart
