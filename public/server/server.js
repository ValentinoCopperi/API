"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class ServerApp {
    constructor(options) {
        const { port, routes } = options;
        this.app = (0, express_1.default)();
        this.port = port;
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:5173', // Origen específico permitido
            credentials: true // 
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(routes);
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port: ${this.port}`);
        });
    }
}
exports.ServerApp = ServerApp;
