import React from "react";
import { useSelector } from "react-redux";
import UserSearchBar from "../components/UserSearchBar";
import userService from "../services/users";
import { useState, useEffect } from 'react';


const Landing = () => {
  const[users, setUsers] = useState([])
  const[filteredItems, setFilteredItems] = useState([])
  //console.log(users)

  const user = useSelector((state) => state.user.value)


  const hook = () => {
    console.log('effect')
    userService.getAll().then(initialArr => setUsers(initialArr))   //initialArr is what we get from noteservice obj (array), we then set it to persons
  }

  useEffect(hook, [])

  const handleSearch = (term) =>{
    const filtered = users.filter((item) => item.username.toLowerCase().includes(term.toLowerCase()))
    setFilteredItems(filtered)
  }

  const handleAddFriend = (id) =>{
    //user.friends.push(id)
    //userService.update(user)
    console.log(user)
  }

  return (
    <div>
      <h1>Home Page</h1>
      <div>Hi {user.name} !</div>
      <div>{user.username} !</div>
      <UserSearchBar data = {users} onSearch={handleSearch}/>
      <ul>
        {filteredItems.map((item, index) => (<li key={index}>
          {item.username}
          <button onClick={() => handleAddFriend(item.id)}>Add friend</button>
          </li>))}
      </ul>
    </div>
  );
};

export default Landing;
