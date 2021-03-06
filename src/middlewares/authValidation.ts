import AppError from "../errors/AppError";
import { NextFunction, Response } from "express";
import { signupSchema, loginSchema } from '../validations/user.validations';

export const validateSignupParams = (req: any, res: Response, nxt: NextFunction) => {
	const joiValidation = signupSchema.validate(req.body);

	if (joiValidation.error) {
		const errorObj = joiValidation.error.details.reduce((acc: any, err: any) => {
            if (err.context?.label) {
                acc[err.context.label] = err.message;
                return acc;
            }
		}, {});
		throw new AppError({
			message: errorObj,
			type: "Erro-Validação-Signup",
			status: 400
		});
	}
	return nxt();
};

export const validateLoginParams = (req: any, res: Response, nxt: NextFunction) => {
	const joiValidation = loginSchema.validate(req.body);

	if (joiValidation.error) {
		const errorObj = joiValidation.error.details.reduce((acc: any, error: any) => {
			acc[error.context.label] = error.message;
	
			return acc;
		}, {});
		throw new AppError({
			message: errorObj,
			type: "Erro-Validação-Login",
			status: 400
		});
	}
	return nxt();
};