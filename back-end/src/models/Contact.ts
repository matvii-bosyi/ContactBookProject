import { Schema, model } from 'mongoose'

const schema = new Schema({
	name: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true,
		match: /^\+?[0-9\s\-]{7,15}$/,
		unique: true
	}
}, {
	timestamps: true
})

export default model('Contact', schema)