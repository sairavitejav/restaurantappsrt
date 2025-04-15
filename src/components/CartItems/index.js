import {ImCross} from 'react-icons/im'
import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItems = props => {
  const {
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)
  const {item} = props
  const {
    dishId,
    dishName,
    dishCurrency,
    dishImage,
    quantity,
    dishType,
    dishPrice,
  } = item

  const price = dishPrice * quantity

  const onRemoveItem = () => {
    removeCartItem(dishId)
  }

  const increaseCartQuant = () => {
    incrementCartItemQuantity(dishId)
  }

  const decreaseCartQuant = () => {
    decrementCartItemQuantity(dishId)
  }

  return (
    <li className="cart-list-items">
      <div>
        <img className="cart-dish-img" src={dishImage} alt={dishName} />
      </div>
      <div>
        <p>Dish Name: {dishName}</p>
        <div className="detail-contain">
          <div>
            <p>Dish Type: {dishType}</p>
            <p>Quantity: {quantity}</p>
            <p>
              Price: {dishCurrency} {price}
            </p>
          </div>
          <div>
            <button onClick={decreaseCartQuant} className="quant" type="button">
              -
            </button>
            <button onClick={increaseCartQuant} className="quant" type="button">
              +
            </button>
          </div>
        </div>
      </div>
      <div>
        <button onClick={onRemoveItem} className="delete-btn" type="button">
          <ImCross />
        </button>
      </div>
    </li>
  )
}
export default CartItems
