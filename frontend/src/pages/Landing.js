import React from "react";
//import { useSelector } from "react-redux";
import UserSearchBar from "../components/UserSearchBar";
import userService from "../services/users";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalUser  } from '../store'
import FriendList from "../components/FriendList";


const Landing = () => {
  const[users, setUsers] = useState([])
  const[filteredItems, setFilteredItems] = useState([])

  const dispatch = useDispatch();

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
    console.log(id)

    const updatedUser = { ...user, friends: [...user.friends, id] };
    userService.update(updatedUser).then(() => {
      dispatch(setGlobalUser(updatedUser))

    }).catch(error => {
      console.error("Error updating user:", error);
    })
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
      <FriendList data={users.filter(obj => user.friends.includes(obj.id) )}/>
    </div>
  );
};

export default Landing;
