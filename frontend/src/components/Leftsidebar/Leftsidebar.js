import React, { useState } from "react"
import { Link } from 'react-router-dom'
import styles from './Leftsidebar.module.css'
import SearchPopup from "../SearchPopup/SearchPopup"

const Leftsidebar = ({ onSearchClick }) => {
    const[isPopupVisible, setPopupVisible] = useState(false)

    const handleSearchClick = () => {
        setPopupVisible(true)
    }

    const closePopup = () => {
        setPopupVisible(false)
    }

    return(
        <div className={styles.sidebar}>
            <ul className={styles.sidebarList}>
                <li className={styles.sidebarItem}>
                    <Link to="/landing"> 
                        <i className="fas fa-home"> </i> Home
                    </Link>
                </li>
                <li className={styles.sidebarItem} onClick={onSearchClick} >
                    <i className="fas fa-search"> </i> Search
                </li>
            </ul>
            {isPopupVisible && <SearchPopup onClose={closePopup} />}
        </div>
    )
}

export default Leftsidebar