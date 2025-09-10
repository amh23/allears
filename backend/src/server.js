import express from 'express';
import { routes } from './routes/index.js';
import { getDbConnection }  from './util/db.js';
import cors from 'cors';

const PORT = process.env.PORT || 8080;
const app = express();
const corsOptions = {
    origin: process.env.FRONTEND_PROD_URL || process.env.FRONTEND_LOCAL_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
    credentials: true, // Allow cookies
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
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

