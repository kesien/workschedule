export class ServerError {
    statusCode: number;
    messages: string[];
    constructor(statusCode: number, messages: string[]) {
        this.statusCode = statusCode;
        this.messages = messages;
    }
}