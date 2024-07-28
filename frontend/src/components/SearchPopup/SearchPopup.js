import React, { useState } from "react"
import styles from './SearchPopup.module.css'

const SearchPopup = ({ onClose, users, handleAddFriend, user}) => {
    const [searchTerm,  setSearchTerm] = useState("")

    const filteredItems = users.filter(
        item =>
          item.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
          item.id !== user.id
      )

    return(
        <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          <h2>Search Users</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className={styles.searchInput}
          />
          <ul className={styles.userList}>
            {filteredItems.map((item, index) => (
              <li key={index} className={styles.userListItem}>
                {item.username}
                <button
                  onClick={() => handleAddFriend(item.id)}
                  className={styles.addButton}
                >
                  Add friend
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
    
}

export default SearchPopup