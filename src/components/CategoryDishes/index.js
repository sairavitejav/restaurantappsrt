import {useState, useContext} from 'react'
import {BiFoodTag} from 'react-icons/bi'
import CartContext from '../../context/CartContext'
import './index.css'

const CategoryDishes = props => {
  const [quantity, setQuantity] = useState(0)
  const {addCartItems} = useContext(CartContext)
  const {dishItems} = props
  const {
    dishType,
    dishName,
    dishPrice,
    dishImage,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishAvailability,
    addonCat,
  } = dishItems
  const dishTypeClass = dishType === 2 ? 'green' : 'red'

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0))
  }

  const addToCart = () => {
    if (quantity > 0) {
      addCartItems({...dishItems, quantity})
    }
  }

  return (
    <li className="each-dish">
      <div className="dish-cat-container">
        <div>
          <BiFoodTag className={dishTypeClass} />
        </div>
        <div className="dish-details-container">
          <h1 className="dish-name">{dishName}</h1>
          <p className="dish-price">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dish-description">{dishDescription}</p>
          {dishAvailability ? (
            <>
              <div className="dish-add-remove-btn-container">
                <button
                  onClick={decreaseQuantity}
                  className="add-remove-btn"
                  type="button"
                  disabled={quantity === 0}
                >
                  -
                </button>
                <p className="dish-count">{quantity}</p>
                <button
                  onClick={increaseQuantity}
                  className="add-remove-btn"
                  type="button"
                >
                  +
                </button>
              </div>
              {quantity > 0 && (
                <button onClick={addToCart} type="button" className="cart-btn">
                  ADD TO CART
                </button>
              )}
            </>
          ) : (
            <p className="not-available">Not available</p>
          )}
          {addonCat.length > 0 && (
            <p className="custom">Customizations available</p>
          )}
        </div>
      </div>
      <div>
        <p className="calories">{dishCalories} calories</p>
      </div>
      <div>
        <img className="dish-image" src={dishImage} alt={dishName} />
      </div>
    </li>
  )
}
export default CategoryDishes
