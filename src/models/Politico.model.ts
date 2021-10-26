import { Schema, model } from 'mongoose';

import electedPositionsEnum from '../constants/positions.enum';
import statesEnum from '../constants/states.enum';
import moderationEnum from '../constants/moderation.enum';



const politicoSchema = new Schema({
    fullName: { type: String, required: true, min: 10, max: 80 },
    socialName: { type: String, max: 80 },
    cpf: { type: String, min:11, max: 11, required: true },
    race: { type: String, required: true },
    gender: { type: String, required: true },
    education: {type: String, required: true},
    currentPosition: {
        type: String,
        enum: electedPositionsEnum,
        required: true
    },
    status: {
        type: String,
        enum: moderationEnum,
        required: true,
        default: moderationEnum[0]
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    officialInfoURL: { type: String, unique: true },
    imageURL: { type: String, required: true, unique: true },
    lastEditBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Politico = model('Politico', politicoSchema);

export default Politico;