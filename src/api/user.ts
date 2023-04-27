import { AxiosResponse } from 'axios'
import { AuthResponse, IUpdateUser, IUser } from './types'
import $api from '../http'

export default class UsersService {
	static async getUsers(): Promise<AxiosResponse<IUser[]>> {
		return $api.get<IUser[]>('/users')
	}
	static async updateUser(
		userId: string,
		params: IUpdateUser,
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>(`/updateUser/${userId}`, { params })
	}
}
