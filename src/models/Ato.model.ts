import { timeStamp } from 'console';
import { Schema, model } from 'mongoose';

const AtoSchema = new Schema({
    descricao: { type: String, required: true },
    fonte_oficial: { type: String, required: true },
    politicos: [{ type: Schema.Types.ObjectId, ref: 'Politico', required: true }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Ato = model('Act', AtoSchema);

export default Ato;