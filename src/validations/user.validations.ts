import joi from 'joi';

const userSchemaValidation = {
	firstName: joi.string().min(3).max(50).required(),
	lastName: joi.string().min(3).max(100).required(),
	email: joi.string().email().required(),
	cpf: joi.string().min(11).max(14).required(),
	password: joi
		.string()
		.min(8)
		.max(200)
		.pattern(/[A-Za-z0-9#%&*@!]/),
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