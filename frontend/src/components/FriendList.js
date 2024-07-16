import React , { useState }from 'react'
import styles from './FriendList.module.css'

const FriendList = ({data}) =>{
console.log(data)

    return(
        <div className={styles.friendListSidebar}>
            <div className={styles.friendListTitle}>
            Friends 
            <ul className={styles.friendList}>
            {data.map((item, index) => (
                <li key={index} className={styles.friendListItem}>
                <span className={styles.friendUsername}>{item.username}</span>
            </li>
            ))}
            </ul>
            </div>
        </div>
    );
}

export default FriendList;