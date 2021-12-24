import { Schema, model } from 'mongoose';
import moderationEnum from '../constants/moderation.enum';

const noticiaSchema = new Schema({
    acts: [{ type: Schema.Types.ObjectId, ref: 'Act' }],
    headline: { type: String, required: true, min: 5, max: 100 },
    introduction: { type: String, required: true, max: 1000 },
    sources: [{ type: String, required: true }],
    politicos: [{ type: Schema.Types.ObjectId, ref: 'Politico', required: true }],
    status: {
        type: String,
        enum: moderationEnum,
        required: true,
        default: moderationEnum[0]
    },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lastEditBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Noticia = model('News', noticiaSchema);

export default Noticia;