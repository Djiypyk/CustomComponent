import { AxiosResponse } from 'axios'
import $api from '../http'
import { IUser } from './types'

export default class UsersService {
    
	static async getUsers(): Promise<AxiosResponse<IUser[]>> {
		return $api.get<IUser[]>('/users')
	}
	static async updateUser(userId: string): Promise<AxiosResponse<IUser>> {
		return $api.post<IUser>(`/updateUser/${userId}`)
	}
}
