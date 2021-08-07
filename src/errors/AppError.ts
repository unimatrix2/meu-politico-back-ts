export default class AppError extends Error {
    message: string;
    type: string;
    status: number;
    stack: any;

    constructor(message?: string,
        type?: string, status?: number, stack?: any) {
        super(message);

        this.message = message || 'Ops! Ocorreu um erro. Tente novamente mais tarde.';
        this.type = type || 'Erro no Servidor';
        this.status = status || 500;
        this.stack = stack;
    }
}