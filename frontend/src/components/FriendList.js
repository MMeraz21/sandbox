import React , { useState }from 'react'

const FriendList = ({data}) =>{
console.log(data)

    return(
        <div>
        Friends 
        <ul>
        {data.map((item, index) => (<li key={index}>
          {item.username}
          </li>))}
      </ul>
        </div>
    );
}

export default FriendList;