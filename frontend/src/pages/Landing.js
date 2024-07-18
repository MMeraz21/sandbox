import React from "react";
//import { useSelector } from "react-redux";
import styles from './Landing.module.css'
import UserSearchBar from "../components/UserSearchBarTemp"
import userService from "../services/users"
import postService from '../services/posts'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setGlobalUser  } from '../store'
import FriendList from "../components/FriendList"
import PostForm from '../components/PostForm'



const Landing = () => {
  const[users, setUsers] = useState([])
  const[filteredItems, setFilteredItems] = useState([])
  const[posts, setPosts] = useState ([])

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value)


  const hook = () => {
    console.log('effect')
    userService.getAll().then(initialArr => setUsers(initialArr))   //initialArr is what we get from noteservice obj (array), we then set it to persons
    // postService.getAll().then(initialArr => setPosts(initialArr))
    postService.getAll().then((initialArr) => {  //not a fan of this implementation, should be a way to get a users posts from backend with a query
      const filteredPosts = initialArr.filter(post =>
        post.user.id === user.id || user.friends.includes(post.user.id)
      )
      filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(filteredPosts)
    })
  }

  useEffect(hook, [user])

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

  const handlePostCreated = (newPost) => {
    // setPosts(posts.concat(newPost))
    setPosts([newPost, ...posts])
  }

  return (
    <div className={styles.container}>
      <h1 className = {styles.header}>Home Page</h1>
      <div className = {styles.greeting}>Hi {user.name} !</div>
      <div className = {styles.greeting}>{user.username} !</div>
      <UserSearchBar data = {users} onSearch={handleSearch}/>
      <ul className = {styles.userList}>
        {filteredItems.map((item, index) => (
          <li key={index} className = {styles.userListItem}>
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
      <PostForm onPostCreated={handlePostCreated} />
      <div className = {styles.postsContainer}>
        {posts.map((post) => (
          <div key = {post.id} className = {styles.post}>
            <div className = {styles.postHeader}>
              <span className = {styles.postOwner}>{post.user.username}</span>
            </div>
            <p className={styles.postContent}>{post.Content}</p>
            <div className={styles.postFooter}>
              <small className={styles.postDate}>{post.date}</small>
              <small className = {styles.postLikes}>Likes: {post.likes}</small>
            </div>
          </div>
        ))}
      </div>
      <FriendList data={users.filter(obj => user.friends.includes(obj.id) )}/>
    </div>
  )

}

export default Landing;
