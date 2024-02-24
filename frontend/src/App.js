import { useState, useEffect } from 'react'
import loginService from './services/login'
import postService from './services/posts'
import {BrowserRouter as Router, Routes, Switch, Route, Link, useNavigate} from 'react-router-dom'
import Landing from './pages/Landing'
import Loginpage from './pages/loginpage'

const App = () =>{
const[user,setUser] = useState(null)
const [username, setUsername] = useState('') 
const [password, setPassword] = useState('') 
const navigate = useNavigate()

const padding = {
  padding: 5
}

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
    navigate("/Landing")
  }catch(exception){
    console.log("didnt work")
  }
}

const handleLogout = async(event) => {
  window.localStorage.removeItem("loggedUser")
}
  
  return(
  <div>
    <h1>Welcome to my Sandbox!</h1>
        <Routes>
          <Route path="/Landing" element={<Landing />} />
          <Route path="/loginpage" element={<Loginpage />} />
        </Routes>

        <Link style={padding} to="/loginpage">LOGIN</Link>
  </div>);

  }
  export default App;
