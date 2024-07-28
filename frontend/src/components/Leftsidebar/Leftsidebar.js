import React from "react"
import { Link } from 'react-router-dom'
import styles from './Leftsidebar.module.css'

const Leftsidebar = () => {
    return(
        <div className={styles.sidebar}>
            <ul className={styles.sidebarList}>
                <li className={styles.sidebarItem}>
                     <Link to="/landing"> 
                        <i className="fas fa-home"> </i> Home</Link>
                </li>
            </ul>
        </div>
    )
}

export default Leftsidebar