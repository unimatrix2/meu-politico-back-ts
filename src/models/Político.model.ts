import { Schema, model } from 'mongoose';

import electedPositionsEnum from '../constants/positions.enum';
import statesEnum from '../constants/states.enum';
import moderationEnum from '../constants/moderation.enum';



const politicoSchema = new Schema({
    fullName: { type: String, required: true, min: 10, max: 80 },
    socialName: { type: String, required: true, max: 80 },
    currentPosition: {
        type: String,
        enum: electedPositionsEnum,
        required: true
    },
    history: [{
        position: { type: String, enum: electedPositionsEnum },
        period: {
            begin: { type: Date },
            end: { type: Date }
        }
    }],
    status: {
        type: String,
        enum: moderationEnum,
        required: true
    },
    province: {
        type: String,
        enum: statesEnum,
        required: true
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    officialInfoURL: { type: String, required: true },
    imageURL: { type: String, required: true },
    lastEditBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Politico = model('Politico', politicoSchema);