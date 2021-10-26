import { Schema, model } from 'mongoose';

import electedPositionsEnum from '../constants/positions.enum';

const historySchema = new Schema({
	position: { type: String, enum: electedPositionsEnum, required: true },
	electionID: { type: Schema.Types.ObjectId, required: true, ref: 'Election' },
	electionSequential: { type: String, required: true },
	province: { type: String, required: true },
    city: { type: String },
	period: {
		begin: { type: Date, required: true },
		end: { type: Date, required: true },
	},
	party: { type: String, required: true },
	politico: { type: Schema.Types.ObjectId, required: true },
	lastEditBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const History = model('Hisotry', historySchema);

export default History;