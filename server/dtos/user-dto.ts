interface IUserDto {
	email?: string
	_id: string
	isActivated: boolean
	ethAddress?: string
}

export class UserDto {
	email?: string
	id: string
	isActivated: boolean
	ethAddress?: string

	constructor(model: IUserDto) {
		this.email = model.email
		this.id = model._id
		this.isActivated = model.isActivated
		this.ethAddress = model.ethAddress
	}
}
