export interface IUser {
	email?: string
	location: string
	name: string
	workPosition: string
	isActivated?: boolean
	id: string
	ethAddress?: string
}

export interface AuthResponse {
	accessToken: string
	refreshToken: string
	user: IUser
}
