import { ApiError, request } from './client'

const USERS_KEY = 'youthnews_users'
const SESSION_KEY = 'youthnews_session'

const demoUser = {
    id: 1,
    name: 'Người dùng mẫu',
    email: 'demo@youthnews.vn',
    password: '12345678',
}

let memoryUsers = [demoUser]

const normalizeEmail = (email = '') => email.trim().toLowerCase()

function readUsers() {
    try {
        const raw = localStorage.getItem(USERS_KEY)
        return raw ? JSON.parse(raw) : memoryUsers
    } catch {
        return memoryUsers
    }
}

function writeUsers(users) {
    memoryUsers = users
    try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users))
    } catch {
        return
    }
}

function writeSession(user) {
    try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    } catch {
        return
    }
}

const toPublicUser = (user) => ({ id: user.id, name: user.name, email: user.email })

export function register({ name, email, password }) {
    return request(() => {
        const users = readUsers()
        const normalized = normalizeEmail(email)
        if (users.some((u) => normalizeEmail(u.email) === normalized)) {
            throw new ApiError('Email này đã được đăng ký', 409)
        }
        const user = {
            id: Date.now(),
            name: name.trim(),
            email: normalized,
            password,
        }
        writeUsers([...users, user])
        return toPublicUser(user)
    })
}

export function login({ email, password }) {
    return request(() => {
        const normalized = normalizeEmail(email)
        const user = readUsers().find((u) => normalizeEmail(u.email) === normalized)
        if (!user || user.password !== password) {
            throw new ApiError('Email hoặc mật khẩu không đúng', 401)
        }
        const publicUser = toPublicUser(user)
        writeSession(publicUser)
        return publicUser
    })
}