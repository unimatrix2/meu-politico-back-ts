/**
 * @module AtoModel
 * @description Esse módulo contém o modelo de Ato oficial para um político.
 * Atualmente o ato é um modelo de relação independente da hierarquia de dados,
 * e contém uma array de políticos envolvidos no ato. Idealmente essa array será usada
 * de forma limitada para identificar autoria e co-autoria.
 */
import { Schema, model } from 'mongoose';

/**
 * Definição do schema de ato
 * @param {string} description
 * @param {string} source
 * @param {array} news
 * @param {array} politicos
 * @param {string} owner
 */
const AtoSchema = new Schema({
    description: { type: String, required: true },
    source: { type: String, required: true },
    news: [{ type: Schema.Types.ObjectId, ref: 'News' }],
    politicos: [{ type: Schema.Types.ObjectId, ref: 'Politico', required: true }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Ato = model('Act', AtoSchema);

export default Ato;