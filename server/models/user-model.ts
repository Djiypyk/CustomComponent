import { Schema, model } from 'mongoose'

export const UserSchema = new Schema({
	email: { type: String, unique: true },
	password: { type: String },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String },
	ethAddress: { type: String, unique: true },
})

export default model('User', UserSchema)
