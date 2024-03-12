import React from 'react'
import { useState, useEffect } from 'react'
import loginService from '../services/login'
import postService from '../services/posts'
import {BrowserRouter as Router, Routes, Switch, Route, Link, useNavigate} from 'react-router-dom'
import Landing from './Landing'
import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalUser  } from '../store'



const Loginpage = () => {
    const[user,setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const thisUser = useSelector((state) => state.user.value)

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
          console.log(user)
          window.localStorage.setItem("loggedUser", JSON.stringify(user))
          postService.setToken(user.token)
          console.log(user.token)
          setUser(user)
          dispatch(setGlobalUser(user))
          setUsername("")
          setPassword("")
          navigate("/Landing")
        }catch(exception){
          console.log("didnt work")
        }
      }

    return(
        <div>
<h2>Log in to the application</h2>
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

export default Loginpage;
