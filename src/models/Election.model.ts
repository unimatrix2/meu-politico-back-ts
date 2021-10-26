import { Schema, model } from 'mongoose';

import electionEnum from '../constants/elections.enum';

const electionSchema = new Schema({
    year: { type: String, required: true, min: 4, max: 4 },
    versionDate:  { type: Date, required: true },
    type: { type: String, required: true, enum: electionEnum },
    term: { type: Number, required: true, enum: [1, 2] },
    officialID: { type: String, required: true }
}, { timestamps: true });

const Election = model('Election', electionSchema);

export default Election;