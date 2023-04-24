import axios from 'axios'
import AuthService from '../api/auth'

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
				const refreshToken = localStorage.getItem('refreshToken')
				const res = await AuthService.refresh(refreshToken ?? '')
				localStorage.setItem('token', res.data.accessToken)
				localStorage.setItem('refreshToken', res.data.refreshToken)

				return $api.request(originalRequest)
			} catch (err) {
				console.log('User is not authorized')
			}
		}
		throw error
	},
)

export default $api
