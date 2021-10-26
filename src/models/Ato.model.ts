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
 * @param {string} description Descrição do ato realizado por um político
 * @param {string} officialSource Fonte oficial onde foi reportado o ato do político
 * @param {array} news Notícias publicadas que referem ao ato do político
 * @param {array} politicos Políticos envolvidos nesse ato. Idealmente contém apenas 1, mas serve para casos de co-autoria
 * @param {string} owner ID do usuário que cadastrou o ato na plataforma
 * @description No momento, o modelo de ato se baseia no princípio de que toda notícia parte de um ato, 
 * mas nem todo ato é de fato
 */
const AtoSchema = new Schema({
    description: { type: String, required: true },
    officalSource: { type: String, required: true },
    news: [{ type: Schema.Types.ObjectId, ref: 'News' }],
    politicos: [{ type: Schema.Types.ObjectId, ref: 'Politico', required: true }],
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lastEditBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Ato = model('Act', AtoSchema);

export default Ato;