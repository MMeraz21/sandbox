import React , { useState }from 'react'
 //hiiiii

const UserSearchBar = ({data, onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchChange = (e) => {
        const term = e.target.value
        setSearchTerm(term)
        onSearch(term)
    }

    return(
        <div>
            <label htmlFor='search'>Find Friends:</label>
            <input
                type = "text"
                id = "search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder='Type to search...'
                />
        </div>
    );

}

export default UserSearchBar;