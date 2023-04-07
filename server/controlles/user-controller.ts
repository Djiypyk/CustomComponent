import userService from '../service/user-service'

export class UserController {
	//TODO types for UserControllere

	async registarion(req: any, res: any, next: any) {
		try {
			const { email, password } = req.body
			const userData = await userService.registration(email, password)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			return res.json(userData)
		} catch (e) {
			console.log(e)
		}
	}
	async login(req: Request, res: Response, next: any) {
		try {
		} catch (e) {}
	}
	async logout(req: Request, res: Response, next: any) {
		try {
		} catch (e) {}
	}
	async activate(req: Request, res: Response, next: any) {
		try {
		} catch (e) {}
	}
	async refresh(req: Request, res: Response, next: any) {
		try {
		} catch (e) {}
	}
	async getUser(req: Request, res: Response, next: any) {
		try {
			//@ts-ignore
			res.json(['123', '345'])
		} catch (e) {}
	}
}

export default new UserController()
