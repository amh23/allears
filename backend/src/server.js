import express from 'express';
import { routes } from './routes/index.js';
import { getDbConnection }  from './util/db.js';
import cors from 'cors';

const PORT = process.env.PORT || 8080;
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
    credentials: true, // Allow cookies
    optionsSuccessStatus: 204 // Some legacy browsers choke on 204
  };
  
app.use(cors(corsOptions));
app.use(express.json());

routes.forEach(route => {
    app[route.method](route.path, route.handler);
})

getDbConnection(process.env.MONGODB_DB_NAME)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    });

