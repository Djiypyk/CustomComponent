import { AuthResponse } from '../api/types'
import axios from 'axios'

export const API_URL = `https://customserver.onrender.com/api`

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

$api.interceptors.response.use(
	(config) => {
		return config
	},
	async (error) => {
		const originalRequest = error.config
		if (error.response.status === 401 && !error.config._isRetry) {
			originalRequest._isRetry = true
			try {
				const res = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
				localStorage.setItem('token', res.data.accessToken)
				return $api.request(originalRequest)
			} catch (err) {
				console.log('User is not authorized')
			}
		}
		throw error
	},
)

export default $api
