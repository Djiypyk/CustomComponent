import jwt from 'jsonwebtoken'
import { Model } from 'mongoose'
import tokenModel from '../models/token-model'

export class TokenService {
	generateTokens(payload: { email: string; id: string; isActivated: boolean }) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN || 'jwt_key', {
			expiresIn: '35m',
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN || 'jwt_refresh_key', {
			expiresIn: '30d',
		})
		return { accessToken, refreshToken }
	}

	validateAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN || 'jwt_key')
			return userData
		} catch {
			return null
		}
	}

	validateRefreshToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN || 'jwt_refresh_key')
			return userData
		} catch {
			return null
		}
	}

	async saveToken(userId: string, refreshToken: string) {
		const tokenData = await tokenModel.findOne({ user: userId })
		if (tokenData) {
			tokenData.refreshToken = refreshToken
			return tokenData.save()
		}
		const token = await tokenModel.create({ user: userId, refreshToken })
		return token
	}

	async removeToken(refreshToken: string) {
		const tokenData = await tokenModel.deleteOne({ refreshToken })
		return tokenData
	}

	async findToken(refreshToken: string) {
		const tokenData = await tokenModel.findOne({ refreshToken })
		return tokenData
	}
}
export default new TokenService()
