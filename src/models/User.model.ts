import { Schema, model } from "mongoose";
import joi from "joi";
import AppError from "../errors/AppError";
import { NextFunction } from "express";

const userSchema = new Schema(
	{
		firstName: { type: String, required: true, min: 3, max: 50 },
		lastName: { type: String, required: true, min: 3, max: 100 },
		email: { type: String, required: true, unique: true },
		cpf: { type: String, required: true, min: 11, max: 14, unique: true },
		password: { type: String, required: true, min: 8, max: 200 },
		role: {
			type: String,
			enum: ["usuário", "moderador", "admin"],
			required: true,
			default: "usuário",
		},
		imageURL: {
			type: String,
			default:
				"https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar.png",
		},
		news: [{ type: Schema.Types.ObjectId, ref: "News" }],
		politicos: [{ type: Schema.Types.ObjectId, ref: "Politico" }],
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

const signupSchema = joi
	.object(userSchemaValidation)
	.options({ abortEarly: false });

const loginSchema = joi
	.object({
		cpf: userSchemaValidation.cpf,
		password: userSchemaValidation.password,
	})
	.options({ abortEarly: false });

export const validateSignupParams = (req: Request, res: Response, nxt: NextFunction) => {
	const joiValidation = signupSchema.validate(req.body);

	if (joiValidation.error) {
		const errorObj = joiValidation.error.details.reduce((acc: any, err: any) => {
            if (err.context?.label) {
                acc[err.context.label] = err.message;
                return acc;
            }
		}, {});
		throw new AppError(
			JSON.stringify(errorObj),
			"Erro-Validação-Signup",
			400,
		);
	}
	return nxt();
};

export const validateLoginParams = (req: Request, res: Response, nxt: NextFunction) => {
	const joiValidation = loginSchema.validate(req.body);

	if (joiValidation.error) {
		const errorObj = joiValidation.error.details.reduce((acc: any, error: any) => {
			acc[error.context.label] = error.message;
	
			return acc;
		}, {});
		throw new AppError(
			JSON.stringify(errorObj),
			"Erro-Validação-Login",
			400
		);
	}
	return nxt();
};

export const User = model('User', userSchema);
