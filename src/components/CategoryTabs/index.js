import './index.css'

const CategoryTabs = props => {
  const {tabs, onTabActive, isActive} = props
  const {menuCategoryId, menuCategory} = tabs
  const activateTab = () => {
    onTabActive(menuCategoryId)
  }
  const activeClass = isActive ? 'active-tab-btn' : ''
  return (
    <li className="each-tab">
      <button
        onClick={activateTab}
        className={`tab-button ${activeClass}`}
        type="button"
      >
        {menuCategory}
      </button>
    </li>
  )
}
export default CategoryTabs
