import { Schema, model } from 'mongoose';

import electedPositionsEnum from '../constants/positions.enum';
import statesEnum from '../constants/states.enum';

const historySchema = new Schema({
	position: { type: String, enum: electedPositionsEnum, required: true },
	electionID: { type: Schema.Types.ObjectId, required: true, ref: 'Election' },
	sequentialID: { type: String, required: true },
	province: { type: String, required: true, enum: statesEnum },
    city: { type: String },
	party: { type: String, required: true },
	coalition: { type: String },
	coalitionParties: { type: String },
	reelection: { type: Boolean, required: true },
	politico: { type: Schema.Types.ObjectId, required: true },
	lastEditBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const History = model('Hisotry', historySchema);

export default History;