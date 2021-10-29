/**
 * @module ElectionModel
 * @description Esse módulo contém o modelo de Eleição. Ele é utilizado para 
 * identificar o tipo de eleição, as informações gerais da eleição. É um modelo
 * de base da hierarquia de dados, utilizado para identificar o mandato
 * de referência para um político eleito.
 */

import { Schema, model } from 'mongoose';

import electionEnum from '../constants/elections.enum';

/**
 * Definição do schema de eleição
 * @instance Instancia um schema que define as propriedades do modelo de Eleição e
 * é utilizado na API para realizar operações na coleção de atos.
 * @param {Date} date A data em que ocorreu a eleição
 * @param {Date} versionDate A data referência de versão da base de dados do TSE
 * @param {string} officialID O identificador único da eleição na base de dados do TSE
 * @param {object} mandate Define o período do mandato de referência da eleição
 * @param {string} year O ano de referência da eleição
 * @param {number} term O turno da eleição
 * @param lastEditBy O último usuário que atualizou o documento.
 * @param {string} type O tipo da eleição.
 */
const electionSchema = new Schema(
	{
		date: { type: Date, required: true },
		versionDate: { type: Date, required: true },
		officialID: { type: String, required: true },
		mandate: {
			begin: { type: Date, required: true },
			end: { type: Date, required: true }
		},
		year: { type: String, required: true, min: 4, max: 4 },
		term: { type: Number, required: true, enum: [1, 2] },
		lastEditBy: { type: Schema.Types.ObjectId, ref: 'User' },
		type: { type: String, required: true, enum: electionEnum },
	},
	{ timestamps: true }
);

const Election = model("Election", electionSchema);

export default Election;
