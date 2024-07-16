import React , { useState }from 'react'
import styles from './UserSearchBar.module.css'

const UserSearchBar = ({data, onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchChange = (e) => {
        const term = e.target.value
        setSearchTerm(term)
        onSearch(term)
    }

    return(
        <div className={styles.searchContainer}>
            <label htmlFor='search' className={styles.searchLabel}>Find Friends:</label>
            <input
                type = "text"
                id = "search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder='Type to search...'
                className={styles.searchInput}
                />
        </div>
    );

}

export default UserSearchBar;