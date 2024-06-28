import express from 'express';
import { routes } from './routes/index.js';
import { initializeDbConnection } from './db.js';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

routes.forEach(route => {
    app[route.method](route.path, route.handler);
})

initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    });

