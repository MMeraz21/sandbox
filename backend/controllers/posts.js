const postRouter = require('express').Router()
const{response} = require('express')
const jwt = require('jsonwebtoken')
const Post = require('../models/post')
const User = require('../models/user')

    postRouter.get('/', async(request, response)=>{
        const posts = await Post.find({})
        .populate('user', {username:1, name:1})
        response.json(posts)
    })

    postRouter.get('/:id', async (request,response) => {
        const post = await Blog.findById(request.params.id)
        esponse.json(post)
     })

    const getTokenFrom = request => {
        const authorization = request.get('authorization')
        if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
        }
        return null
     }

     postRouter.post('/', async (request, response) => {
        const post = new Post(request.body)
        const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)
        //const user = await User.findById(request.body.userId)
        post.user = user.id
    
        if (typeof post.likes === 'undefined' || post.likes === null) {
          post.likes = 0
        } 
        if (!post.content) {
            return response.status(400).end()
        }
    
        const savedPost = await post.save()
        user.posts = user.posts.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedPost)
      })

      postRouter.delete('/:id', async (request, response) => {
        const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
        console.log(decodedToken)
        if (!request.token && !decodedToken) {
          console.log("didnt work")
          return response.status(401).json({ error: 'token missing or invalid' })
        }
        const postToDelete = await Post.findById(request.params.id)
    
        if(postToDelete.user.toString() === decodedToken.id.toString()){
          await Post.findByIdAndRemove(request.params.id)
          response.status(204).end()
        }else{
          response.status(400).end()
        }
      })

      postRouter.put('/:id', async (request, response) => {    
        const Post = {
          likes: request.body.likes
        }
    
        try {
          const result = await Post.findByIdAndUpdate(request.params.id, post, { new: true })
          response.json(result.toJSON())
        } catch (error) {
          response.status(400).end()
        }
      })


      module.exports = postRouter