import jwt from 'jsonwebtoken'
import { Model } from 'mongoose'
import tokenModel from '../models/token-model'

export class TokenService {
	generateTokens(payload: { email: string; id: string; isActivated: boolean }) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN || 'jwt_key', {
			expiresIn: '30m',
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN || 'jwt_refresh_key', {
			expiresIn: '30d',
		})
		return { accessToken, refreshToken }
	}
	async saveToken(userId: string, refreshToken: string) {
		const tokenData = await tokenModel.findOne({})
	}
}
export default new TokenService()