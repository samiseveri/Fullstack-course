const KEY = 'loggedBloglistUser'

export const getUser = () => {
  const stored = window.localStorage.getItem(KEY)
  return stored ? JSON.parse(stored) : null
}

export const saveUser = (user) => {
  window.localStorage.setItem(KEY, JSON.stringify(user))
}

export const removeUser = () => {
  window.localStorage.removeItem(KEY)
}
