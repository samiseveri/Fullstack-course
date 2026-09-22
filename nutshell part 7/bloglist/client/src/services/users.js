const baseUrl = 'http://localhost:3001/api/users'

const getAll = async () => {
  const response = await fetch(baseUrl)
  return response.json()
}

export default { getAll }
