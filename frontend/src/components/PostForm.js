import React, { useState } from 'react'
import styles from './PostForm.module.css'
import postService from '../services/posts'

const PostForm = ({ onPostCreated }) => {
    const [content, setContent] = useState('')

    const handleSubmit = async(event) => {
        event.preventDefault()

        try{
            const newPost = {
                Content: content,
                likes: 0,

            }

            const createdPost = await postService.create(newPost)
            onPostCreated(createdPost)
            setContent('')
        }catch (error){
            console.error("Error creating post: ", error)
        }
    }

    return(
        <div className = {styles.postFormContainer}>
            <form onSubmit={handleSubmit}>
                <textarea
                    value = {content}
                    onChange = {({ target }) => setContent(target.value)}
                    placeholder = "What's on your mind?"
                    maxLength = {250}
                    className= {styles.textarea}
                />
                <button type='submit' className={styles.submitButton}>
                    Post
                </button>
            </form>
        </div>
    )

}

export default PostForm