import UserModel from '../models/user-model'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import mailService from './mail-service'
import { UserDto } from '../dtos/user-dto'
import tokenService from './token-service'
import { ApiError } from '../exeptions/api-error'

export class UserService {
	async registration(email: string, password: string) {
		const candidate: any = await UserModel.findOne({ email })
		if (candidate) {
			throw ApiError.BadRequest(`Пользователь с почтовым ящиком ${email} уже существует`)
		}

		const hashPassword = await bcrypt.hash(password, 3)
		const activationLink = v4()
		const user = await UserModel.create({ email, password: hashPassword, activationLink })
		await mailService.sendActivationMail(
			email,
			`${process.env.API_URL}/api/activate/${activationLink}`,
		)

		//@ts-ignore
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}
	async activate(activationLink: string) {
		const user = await UserModel.findOne({ activationLink })
		if (!user) {
			throw ApiError.BadRequest('Не корректная ссылка активации')
		}
		user.isActivated = true
		await user.save()
	}

	async login(email: string, password: string) {
		const user = await UserModel.findOne({ email })
		if (!user) {
			throw ApiError.BadRequest('Пользователь не найден')
		}
		const isPassEqual = await bcrypt.compare(password, user.password)
		if (!isPassEqual) {
			throw ApiError.BadRequest('Неверный пароль')
		}
		//@ts-ignore
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	async logout (refreshToken: string){
		const token = await tokenService.removeToken(refreshToken)
		return token


	}
}
export default new UserService()
