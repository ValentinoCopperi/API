import express , {type Router , type Express, Request, Response} from 'express';
import cors, { CorsOptions } from 'cors';
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

        const allowedOrigins = [
            'https://sky-level-frontend-react.vercel.app',
            'http://localhost:5173'
        ];

        const corsOptions: CorsOptions = {
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true
        };

        this.app = express();
        this.port = port;
        this.app.use(express.json());
        this.app.use(cors(corsOptions));

        this.app.use(cookieParser());
        this.app.use(routes);
       
    }

    start() {
        this.app.listen(this.port , () => {
            console.log(`Server listening on port: ${this.port}`);
        })
    }

}