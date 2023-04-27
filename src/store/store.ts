import Web3 from 'web3'
import  { AxiosError } from 'axios'
import { makeAutoObservable } from 'mobx'

import AuthService from '../api/auth'
import UsersService from '../api/user'
import { IUpdateUser, IUser } from '../api/types'

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
		this.setIsLoading(true)
		try {
			const res = await AuthService.login(email, password)
			this.setUser(res.data.user)

			localStorage.setItem('token', res.data.accessToken)
			localStorage.setItem('refreshToken', res.data.refreshToken)

			this.setAuth(true)
			this.setUser(res.data.user)
			this.error = ''
			this.setIsLoading(false)
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message)
				this.error = err.response?.data?.message
				this.setIsLoading(false)
			}
		}
	}

	loginByEth = async (ethAddress: string) => {
		this.setIsLoading(true)
		try {
			const isValidEthAddress = Web3.utils.isAddress(ethAddress)
			if (!isValidEthAddress) {
				this.error = 'Wallet address not valid'
				return
			}
			const res = await AuthService.loginByEth(ethAddress)

			localStorage.setItem('token', res.data.accessToken)
			localStorage.setItem('refreshToken', res.data.refreshToken)

			this.setAuth(true)
			this.setUser(res.data.user)
			this.error = ''
			this.setIsLoading(false)
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message)
				this.error = err.response?.data?.message
				this.setIsLoading(false)
			}
		}
	}

	registration = async (email: string, password: string) => {
		this.setIsLoading(true)
		try {
			const res = await AuthService.registration(email, password)

			localStorage.setItem('token', res.data.accessToken)
			localStorage.setItem('refreshToken', res.data.refreshToken)
			this.setAuth(true)
			this.setUser(res.data.user)
			this.error = ''
			this.setIsLoading(false)
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message)
				this.error = err.response?.data?.message
				this.setIsLoading(false)
			}
		}
	}

	updateUser = async (params: Omit<IUpdateUser, 'refreshToken'>) => {
		this.setIsLoading(true)
		try {
			const refreshToken = localStorage.getItem('refreshToken')
			if (refreshToken) {
				const res = await UsersService.updateUser(this.user.id, {
					...params,
					refreshToken,
				})
				this.setUser(res.data.user)
				localStorage.setItem('token', res.data.accessToken)
				localStorage.setItem('refreshToken', res.data.refreshToken)
			}
			this.setIsLoading(false)
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message)
				this.error = err.response?.data?.message
			}
			this.setIsLoading(false)
		}
	}

	logout = async () => {
		try {
			await AuthService.logout()
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
			const refreshToken = localStorage.getItem('refreshToken')
			const res = await AuthService.refresh(refreshToken ?? '')

			localStorage.setItem('token', res.data.accessToken)
			localStorage.setItem('refreshToken', res.data.refreshToken)

			this.setAuth(true)
			this.setUser(res.data.user)
			this.error = ''

			this.setIsLoading(false)
		} catch (err) {
			this.setIsLoading(false)
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message)
				this.error = err.response?.data?.message
			}
		} finally {
			this.setIsLoading(false)
		}
	}
}
