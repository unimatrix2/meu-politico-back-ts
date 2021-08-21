import { Schema, model } from "mongoose";
import joi from "joi";

const userSchema = new Schema(
	{
		firstName: { type: String, required: true, min: 3, max: 50 },
		lastName: { type: String, required: true, min: 3, max: 100 },
		email: { type: String, required: true, unique: true },
		cpf: { type: String, required: true, min: 11, max: 14, unique: true },
		password: { type: String, required: true, min: 8, max: 200 },
		role: {
			type: String,
			enum: ['usuário', 'moderador', 'admin'],
			required: true,
			default: 'usuário',
		}
	},
	{ timestamps: true }
);

const User = model('User', userSchema);

export default User;