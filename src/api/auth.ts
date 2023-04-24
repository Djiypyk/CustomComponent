import { AxiosResponse } from 'axios'
import $api from '../http'
import { AuthResponse } from './types'

export default class AuthService {
	static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/login', { email, password })
	}
	static async loginByEth(ethAddress: string): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/loginByEth', { ethAddress })
	}
	static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/registration', { email, password })
	}
	static async refresh(refreshToken: string): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/refresh', { refreshToken })
	}
	static async logout(): Promise<void> {
		return $api.post('/logout')
	}
}
