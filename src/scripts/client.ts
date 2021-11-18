import axios from 'axios'

const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
    )

    return JSON.parse(jsonPayload)
}

const sortLevelsToFolders = (levels: Level[]): Folder[] => {
    const folders = levels.reduce((acc: Record<string, Level[]>, cur) => {
        if (!acc[cur.folderName]) {
            acc[cur.folderName] = []
        }
        acc[cur.folderName].push(cur)
        return acc
    }, {})

    return Object.keys(folders)
        .sort()
        .map(key => ({ folderName: key, levels: folders[key] }))
}

axios.defaults.baseURL = process.env.serverURL

const setHeader = (token: string) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    console.log('token set!', token)
}

const token = localStorage.getItem('token')
if (token) {
    setHeader(token)
}

export default {
    async login(username: string, password: string) {
        const res = await axios.post('login', {
            username,
            password
        })
        if (res.status === 200) {
            setHeader(res.headers.authorization)
            localStorage.setItem('token', res.headers.authorization)
        }
    },
    async register(username: string, password: string) {
        const res = await axios.post('users', {
            username,
            password
        })
        if (res.status === 201) {
            setHeader(res.headers.authorization)
            localStorage.setItem('token', res.headers.authorization)
        }
    },
    isAuthenticated() {
        return !!localStorage.getItem('token')
    },
    getAuthenticatedUsername() {
        const token = localStorage.getItem('token')
        if (token === null) {
            throw Error('No token')
        }
        const result = parseJwt(token)
        return result.username
    },
    async getAdminLevels(): Promise<Folder[]> {
        const res = await axios.get('levels', {
            params: {
                adminOnly: true
            }
        })

        return sortLevelsToFolders(res.data.levels)
    },
    async getMyLevels(): Promise<Folder[]> {
        const res = await axios.get('users/me/levels')

        return sortLevelsToFolders(res.data.levels)
    },
    async saveLevel(level: Level) {
        const input: LevelInDTO = {
            gameLevel: level.gameLevel,
            name: level.name,
            folderName: level.folderName,
            isPublic: level.isPublic,
            index: level.index
        }
        const res = await axios.put(`levels/${level.id}`, input)
        return res.status === 204
    },
    async createLevel(level: LevelInDTO): Promise<Level | null> {
        const res = await axios.post('levels', level)
        if (res.status === 201) {
            return res.data as Level
        }
        return null
    },
    async deleteLevel(id: number) {
        const res = await axios.delete(`levels/${id}`)
        return res.status === 204
    },
    async getFeaturedLevels() {
        const res = await axios.get('levels', {
            params: {
                featured: true
            }
        })

        return sortLevelsToFolders(res.data.levels)
    },
    async getLevelById(id: number) {
        const res = await axios.get(`levels/${id}`)
        return res.data as Level
    },

    async logout() {
        localStorage.removeItem('token')
    }
}
