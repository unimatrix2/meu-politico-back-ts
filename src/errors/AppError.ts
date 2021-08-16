import ErrorParams from "../interfaces/errors";

export default class AppError extends Error {
    type: string;
    status: number;

    constructor(params: ErrorParams) {
        super();
        this.message = params.message || 'Ops! Ocorreu um erro. Tente novamente mais tarde.';
        this.type = params.type || 'Erro no Servidor';
        this.status = params.status || 500;
    }
}