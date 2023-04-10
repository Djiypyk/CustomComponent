import { ChangeEvent, useState } from 'react'

export const useLogin = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value)
	}
	const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value)
	}
	return { email, password, changeEmail, changePassword }
}
