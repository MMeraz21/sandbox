const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    if (request.body.password.length < 3 || request.body.username.length < 3) {
        response.status(400).json({ error: 'Password not long enough' })
    } else{
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
}
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    .populate('posts', { content: 1, likes: 1 })

    response.json(users)

  })

  usersRouter.get('/:id', async (request,response) => {
    const post = await User.findById(request.params.id)
    response.json(post)
 })

  usersRouter.put('/:id', async (request, response) => {    
    const { username, name, posts, friends } = request.body;

    const updatedFields = {
      username,
      name,
      posts,
      friends,
    }

    try {
      const result = await User.findByIdAndUpdate(request.params.id, updatedFields, { new: true })
      response.json(result.toJSON())
    } catch (error) {
      console.error("Error updating user:" + error)
      response.status(400).end()
    }
  })
  
module.exports = usersRouter