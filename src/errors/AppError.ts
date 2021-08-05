export default class AppError extends Error {
    message: string;
    type: string;
    status: number;

    constructor(message: string, type: string, status: number) {
        super(message);

        this.message = message || 'Ops! Ocorreu um erro. Tente novamente mais tarde.';
        this.type = type || 'Erro no Servidor';
        this.status = status || 500;
    }
}