import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userService from '../services/users'
import Home from './Home'
import styles from './Signup.module.css'

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
        <div className={styles.formContainer}>
            <h3>Sign Up!</h3>
            <form onSubmit={handleCreateUser}>
            <div className={styles.inputGroup}> 
                <input
                className = {styles.inputField}
                type = "text"
                value = {name}
                name = "Name"
                onChange = {({target}) => setName(target.value)}
                placeholder='Name'
                />
            </div>
            <div className={styles.inputGroup}>
                <input
                className = {styles.inputField}
                type = "text"
                value = {username}
                name = "Username"
                onChange = {({target}) => setUsername(target.value)}
                placeholder='Username'
                />
            </div>
            <div className={styles.inputGroup}>
                <input
                className = {styles.inputField}
                type = "text"
                value = {password}
                name = "Password"
                onChange = {({target}) => setPassword(target.value)}
                placeholder='Password'
                />
            </div>
            <button className={styles.submitButton} type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signuppage;