import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setError] = useState('')
  const history = useHistory()

  const readUsername = event => {
    setUserName(event.target.value)
  }

  const readPassword = event => {
    setPassword(event.target.value)
  }

  const onValidateSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  const onValidateFailure = errMsg => {
    setError(errMsg)
  }

  const validateUser = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      return onValidateSuccess(data.jwt_token)
    }
    return onValidateFailure(data.error_msg)
  }

  if (Cookies.get('jwt_token') !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="restaurant-login-container">
      <h1 className="restaurant-header">Restaurant Food Delivery</h1>
      <form onSubmit={validateUser} className="login-form">
        <h2 className="login-header">Login</h2>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            className="input"
            onChange={readUsername}
            type="text"
            id="username"
            value={username}
            placeholder="Enter Username"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            className="input"
            onChange={readPassword}
            type="password"
            id="password"
            value={password}
            placeholder="Enter Password"
          />
        </div>
        <div className="login-btn-container">
          <button className="login-button" type="submit">
            Login
          </button>
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  )
}
export default Login
