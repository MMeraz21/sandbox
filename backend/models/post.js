const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    Content: {
        type: String,
        maxlength: 250
    },
    likes: Number,
    date: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

  postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Post', postSchema)