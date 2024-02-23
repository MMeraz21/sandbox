import { useState, useEffect } from 'react'
import loginService from './services/login'
import postService from './services/posts'
import {BrowserRouter as Router, Route, Switch, useNavigate} from 'react-router-dom'
//import{useNavigate} from 'react-router-dom'
import Landing from './pages/Landing'

const App = () =>{
const[user,setUser] = useState(null)
const [username, setUsername] = useState('') 
const [password, setPassword] = useState('') 
const navigate = useNavigate()

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if(loggedUserJSON){
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    postService.setToken(user.token)
  }
},[])

const handleLogin = async(event)=>{
  event.preventDefault()
  console.log("loggin in with", username, password)
  try{
    const user = await loginService.login({username,password})
    window.localStorage.setItem("loggedUser", JSON.stringify(user))
    postService.setToken(user.token)
    console.log(user.token)
    setUser(user)
    setUsername("")
    setPassword("")
    navigate(Landing)
  }catch(exception){
    console.log("didnt work")
  }
}

const handleLogout = async(event) => {
  window.localStorage.removeItem("loggedUser")
}
  


  if(user === null){
    return(
      <div>
        <h2>log in to the application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
            type = "text"
            value = {username}
            name = "Username"
            onChange = {({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
            type = "text"
            value = {password}
            name = "Password"
            onChange = {({target}) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return(
    <div>
      {/* <Router>
        <Route path="/" element={<Home />} />
      </Router> */}
      hiiii
      LOGGED IN 
      {user.username}
      <p onClick={handleLogout}>{user.name} logged in
      <button type="button">logout</button>
      </p>
    </div>
  )
}

export default App;
