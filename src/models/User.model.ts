import { Schema, model } from 'mongoose';
import privilegesEnum from '../constants/privileges.enum';

const userSchema = new Schema(
	{
		firstName: { type: String, required: true, min: 3, max: 50 },
		lastName: { type: String, required: true, min: 3, max: 100 },
		email: { type: String, required: true, unique: true },
		cpf: { type: String, required: true, min: 11, max: 14, unique: true },
		password: { type: String, required: true, min: 8, max: 200 },
		role: {
			type: String,
			enum: privilegesEnum,
			required: true,
			default: privilegesEnum[0],
		}
	},
	{ timestamps: true }
);

const User = model('User', userSchema);

export default User;