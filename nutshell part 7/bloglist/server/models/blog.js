import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
  comments: [{ type: String }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (_document, returned) => {
    returned.id = returned._id.toString()
    delete returned._id
    delete returned.__v
  },
})

export default mongoose.model('Blog', blogSchema)
