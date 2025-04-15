import {useContext, useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link, useHistory} from 'react-router-dom'
import {IoCartOutline} from 'react-icons/io5'
import CartContext from '../../context/CartContext'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const Header = () => {
  const [restaurantName, setRestaurantName] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)

  const getRestaurantName = async () => {
    setApiStatus(apiStatusConstant.loading)
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const name = data[0].restaurant_name
      setRestaurantName(name)
      setApiStatus(apiStatusConstant.success)
    } else {
      setApiStatus(apiStatusConstant.failure)
    }
  }

  useEffect(() => {
    getRestaurantName()
  }, [])

  const history = useHistory()
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const {cartList} = useContext(CartContext)

  const cartCount = cartList.length

  const renderSuccessView = () => (
    <h1 className="nav-header">{restaurantName}</h1>
  )

  const renderFailureView = () => <p>Fetching Failed</p>

  const renderLoadingView = () => <Loader type="ThreeDots" color="#000000" />

  const renderDifferentViews = () => {
    switch (apiStatus) {
      case apiStatusConstant.loading:
        return renderLoadingView()
      case apiStatusConstant.success:
        return renderSuccessView()
      case apiStatusConstant.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <nav className="nav-container">
      <Link to="/" className="links">
        {renderDifferentViews()}
      </Link>
      <div className="orders-container">
        <p className="nav-route">My Orders</p>
        <div className="cart-container">
          <p className="cart-count">{cartCount}</p>
          <Link to="/cart" className="links">
            <button className="cart-icon-btn" type="button" data-testid="cart">
              <IoCartOutline className="cart-icon" />
            </button>
          </Link>
        </div>
        <button onClick={onLogout} type="button" className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  )
}
export default Header
