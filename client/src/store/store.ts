import axios, { AxiosError } from 'axios'
import { makeAutoObservable } from 'mobx'
import Web3 from 'web3'

import AuthService from '../api/auth'
import { AuthResponse, IUser } from '../api/types'
import { API_URL } from '../http'

export default class Store {
	user = {} as IUser
	isAuth = false
	error = ''
	isLoading = false
	constructor() {
		makeAutoObservable(this)
	}

	setAuth(authBool: boolean) {
		this.isAuth = authBool
	}
	setUser(user: IUser) {
		this.user = user
	}

	setIsLoading(isLoading: boolean) {
		this.isLoading = isLoading
	}

	login = async (email: string, password: string) => {
		try {
			const res = await AuthService.login(email, password)

			localStorage.setItem('token', res.data.accessToken)

			this.setAuth(true)
			this.setUser(res.data.user)
			this.error = ''
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message)
				this.error = err.response?.data?.message
			}
		}
	}

	loginByEth = async (ethAddress: string) => {
		try {
			const isValidEthAddress = Web3.utils.isAddress(ethAddress)
			if (!isValidEthAddress) {
				this.error = 'Wallet address not valid'
				return
			}
			const res = await AuthService.loginByEth(ethAddress)

			localStorage.setItem('token', res.data.accessToken)

			this.setAuth(true)
			this.setUser(res.data.user)
			this.error = ''
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message)
				this.error = err.response?.data?.message
			}
		}
	}

	registration = async (email: string, password: string) => {
		try {
			const res = await AuthService.registration(email, password)
			console.log(res.data)

			localStorage.setItem('token', res.data.accessToken)
			this.setAuth(true)
			this.setUser(res.data.user)
			this.error = ''
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message)
				this.error = err.response?.data?.message
			}
		}
	}
	logout = async () => {
		try {
			const res = await AuthService.logout()
			localStorage.removeItem('token')
			this.setAuth(false)
			this.setUser({} as IUser)
			this.error = ''
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message)
				this.error = err.response?.data?.message
			}
		}
	}

	checkAuth = async () => {
		this.setIsLoading(true)
		try {
			const res = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
			localStorage.setItem('token', res.data.accessToken)

			this.setAuth(true)
			this.setUser(res.data.user)
			this.error = ''
			console.log(this.user)
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message)
				this.error = err.response?.data?.message
				this.setIsLoading(false)
			}
		} finally {
			this.setIsLoading(false)
		}
	}
}
