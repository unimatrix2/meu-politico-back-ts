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

const userSchemaValidation = {
	firstName: joi.string().min(3).max(50).required(),
	lastName: joi.string().min(3).max(100).required(),
	email: joi.string().email().required(),
	cpf: joi.string().min(11).max(14).required(),
	password: joi
		.string()
		.min(8)
		.max(200)
		.pattern(/[A-Z0-9]/),
};

export const signupSchema = joi
	.object(userSchemaValidation)
	.options({ abortEarly: false });

export const loginSchema = joi
	.object({
		cpf: userSchemaValidation.cpf,
		password: userSchemaValidation.password,
	})
	.options({ abortEarly: false });

export const User = model('User', userSchema);
