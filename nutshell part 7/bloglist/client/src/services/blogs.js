import { getUser } from './persistentUser'

const baseUrl = 'http://localhost:3001/api/blogs'

const authHeader = () => {
  const user = getUser()
  return user ? { Authorization: `Bearer ${user.token}` } : {}
}

const getAll = async () => {
  const response = await fetch(baseUrl)
  return response.json()
}

const create = async (blog) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(blog),
  })
  return response.json()
}

const update = async (id, blog) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(blog),
  })
  return response.json()
}

const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  })
  if (!response.ok) {
    throw new Error('Failed to delete blog')
  }
}

const addComment = async (id, comment) => {
  const response = await fetch(`${baseUrl}/${id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ comment }),
  })
  return response.json()
}

export default { getAll, create, update, remove, addComment }
