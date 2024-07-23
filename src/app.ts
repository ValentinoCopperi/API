import { AppRoutes } from "./routes/app.routes";
import { ServerApp } from "./server/server";

(() => {
    main();
})();

async function main () {

    const server = new ServerApp({
        port : 3000,
        routes : AppRoutes.routes
    });

    server.start();

}