const users = []

export const findByEmail = (email) => {
    const user = users.find(u => u.email === email)
    if(!user) return null
    return user
}

export const createUser = (user) => {
    users.push(user)
    return user
}

export const findById = (id) => {
    const user = users.find(u => u.id === id)
    if(!user) return null
    return user
}