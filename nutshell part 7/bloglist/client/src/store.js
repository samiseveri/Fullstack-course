import { create } from 'zustand'
import blogService from './services/blogs'
import { getUser, removeUser, saveUser } from './services/persistentUser'

let notificationTimer

export const useBlogStore = create((set, get) => ({
  blogs: [],
  user: getUser(),
  notification: '',

  setNotification: (message) => {
    clearTimeout(notificationTimer)
    set({ notification: message })
    notificationTimer = setTimeout(() => set({ notification: '' }), 5000)
  },

  setUser: (user) => {
    saveUser(user)
    set({ user })
  },

  logout: () => {
    removeUser()
    set({ user: null })
    get().setNotification('logged out')
  },

  initializeBlogs: async () => {
    const blogs = await blogService.getAll()
    set({ blogs })
  },

  createBlog: async (blog) => {
    const created = await blogService.create(blog)
    set((state) => ({ blogs: state.blogs.concat(created) }))
    get().setNotification(`a new blog ${created.title} by ${created.author} added`)
    return created
  },

  likeBlog: async (blog) => {
    const updated = await blogService.update(blog.id, { likes: blog.likes + 1 })
    set((state) => ({
      blogs: state.blogs.map((item) => (item.id === updated.id ? updated : item)),
    }))
  },

  removeBlog: async (blog) => {
    await blogService.remove(blog.id)
    set((state) => ({
      blogs: state.blogs.filter((item) => item.id !== blog.id),
    }))
    get().setNotification(`removed ${blog.title}`)
  },

  addComment: async (id, comment) => {
    const updated = await blogService.addComment(id, comment)
    set((state) => ({
      blogs: state.blogs.map((item) => (item.id === updated.id ? updated : item)),
    }))
  },
}))
