import AppError from "../errors/AppError";
import { NextFunction, Response } from "express";
import { signupSchema, loginSchema } from '../models/User.model';

export const validateSignupParams = (req: any, res: Response, nxt: NextFunction) => {
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

export const validateLoginParams = (req: any, res: Response, nxt: NextFunction) => {
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