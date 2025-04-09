import {IoCartOutline} from 'react-icons/io5'
import './index.css'

const Header = props => {
  const {cartList, restaurant} = props
  const cartQuantity = () => {
    const cartCount = cartList.reduce((acc, cur) => acc + cur.quantity, 0)
    return cartCount
  }

  return (
    <nav className="nav-container">
      <h1 className="nav-header">{restaurant}</h1>
      <div className="orders-container">
        <p className="nav-route">My Orders</p>
        <div className="cart-container">
          <p className="cart-count">{cartQuantity()}</p>
          <IoCartOutline className="cart-icon" />
        </div>
      </div>
    </nav>
  )
}
export default Header
