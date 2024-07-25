import React from "react"
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const Home = () =>{
    const padding = {
        padding: 5
      }

    return(
        <div className={styles.linkContainer}>
            <Link style={padding} to="/loginpage" className={styles.linkButton}>LOGIN</Link>
            <Link style={padding} to="/signup" className={styles.linkButton}>SIGNUP</Link>
        </div>
    )
}

export default Home