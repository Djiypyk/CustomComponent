import { Schema, model } from 'mongoose'

export const TokenSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'Userr' },
	refreshToken: { type: String, required: true },
})

export default model('Token', TokenSchema)
