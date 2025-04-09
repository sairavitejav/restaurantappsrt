import {BiFoodTag} from 'react-icons/bi'
import './index.css'

const CategoryDishes = props => {
  const {dishItems, addToCart, removeFromCart, cartList} = props
  const {
    dishId,
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
    addToCart(dishItems)
  }

  const decreaseQuantity = () => {
    removeFromCart(dishItems)
  }
  const quantity = () => {
    const cartQuantity = cartList.find(item => item.dishId === dishId)
    return cartQuantity ? cartQuantity.quantity : 0
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
            <div className="dish-add-remove-btn-container">
              <button
                onClick={decreaseQuantity}
                className="add-remove-btn"
                type="button"
              >
                -
              </button>
              <p className="dish-count">{quantity()}</p>
              <button
                onClick={increaseQuantity}
                className="add-remove-btn"
                type="button"
              >
                +
              </button>
            </div>
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
