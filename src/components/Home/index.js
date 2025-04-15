import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CategoryTabs from '../CategoryTabs'
import CategoryDishes from '../CategoryDishes'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const Home = () => {
  const [restaurantMenuList, setRestaurantMenu] = useState([])
  const [activeTab, setActiveTab] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getRestaurantMenu = async () => {
    setApiStatus(apiStatusConstants.loading)
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)

      const menuList = data[0].table_menu_list.map(item => ({
        menuCategory: item.menu_category,
        menuCategoryId: item.menu_category_id,
        categoryDishes: item.category_dishes.map(dishes => ({
          dishId: dishes.dish_id,
          dishType: dishes.dish_Type,
          dishName: dishes.dish_name,
          dishImage: dishes.dish_image,
          dishPrice: dishes.dish_price,
          dishCalories: dishes.dish_calories,
          dishCurrency: dishes.dish_currency,
          dishDescription: dishes.dish_description,
          dishAvailability: dishes.dish_Availability,
          addonCat: dishes.addonCat,
        })),
      }))
      setRestaurantMenu(menuList)
      setActiveTab(menuList[0].menuCategoryId)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getRestaurantMenu()
  }, [])

  const onTabActive = menuCategoryId => {
    setActiveTab(menuCategoryId)
  }

  const activeCategoryList = restaurantMenuList.find(
    items => items.menuCategoryId === activeTab,
  )

  const categoryDishesList = activeCategoryList
    ? activeCategoryList.categoryDishes
    : []

  const renderFailureView = () => (
    <div>
      <p>OOPS SOMETHING WENT WRONG</p>
    </div>
  )

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" />
    </div>
  )

  const renderSuccessView = () => (
    <>
      <Header />
      <ul className="tabs-container">
        {restaurantMenuList.map(tabs => (
          <CategoryTabs
            tabs={tabs}
            onTabActive={onTabActive}
            key={tabs.menuCategoryId}
            isActive={activeTab === tabs.menuCategoryId}
          />
        ))}
      </ul>

      <ul>
        {categoryDishesList.map(dishItems => (
          <CategoryDishes dishItems={dishItems} key={dishItems.dishId} />
        ))}
      </ul>
    </>
  )

  const renderDifferentViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return <>{renderDifferentViews()}</>
}
export default Home
