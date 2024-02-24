import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userService from '../services/users'
import Home from './Home'

const Signuppage = () =>{
    const[user,setUser] = useState(null)
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const handleCreateUser = async(event)=>{
        event.preventDefault()
        console.log("attempting to create new user with", username, password)
        try{
            const user = {
                username: username,
                name: name,
                password: password
            }
            setUser(user)
            userService.create(user)
            setUsername("")
            setPassword("")
            setName("")
            navigate("/Home")
        }catch(exception){
            console.log(exception)
        }
    }

    return(
        <div>
            <h1>Sign Up!</h1>
            <form onSubmit={handleCreateUser}>
            <div>
                name
                <input
                type = "text"
                value = {name}
                name = "Name"
                onChange = {({target}) => setName(target.value)}
                />
            </div>
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
            <button type="submit">signup</button>
            </form>
        </div>
    )
}

export default Signuppage;