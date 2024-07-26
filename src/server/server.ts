import express , {type Router , type Express, Request, Response} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
interface ServerOptions {
    port : number ;
    routes : Router;
}

export class ServerApp {
    public app : Express;
    public port : number;

    constructor (options : ServerOptions) {
        const { port , routes } = options;

        this.app = express();
        this.port = port;
        this.app.use(express.json());
        this.app.use(cors({
            origin: 'https://sky-level-frontend-react.vercel.app/', // Origen específico permitido
            credentials: true // 
        }));

        this.app.use(cookieParser());
        this.app.use(routes);
       
    }

    start() {
        this.app.listen(this.port , () => {
            console.log(`Server listening on port: ${this.port}`);
        })
    }

}