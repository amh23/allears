// ===========================================
// ALLEARS BACKEND SERVER
// ===========================================
// Main server file for the AllEars backend application
// Handles Express server setup, CORS, routes, and database connection

import express from 'express';
import { routes } from './routes/index.js';
import { getDbConnection }  from './util/db.js';
import cors from 'cors';

// ===========================================
// SERVER CONFIGURATION
// ===========================================
// Port configuration with fallback for local development
const PORT = process.env.PORT || 8080;

// Express app initialization
const app = express();

// ===========================================
// CORS CONFIGURATION FOR LOCAL DEVELOPMENT
// ===========================================
// Configure CORS to allow frontend communication
const corsOptions = {
    // Allow requests from frontend (local development or production)
    origin: [
        process.env.FRONTEND_LOCAL_URL || 'http://localhost:3000', // Local development
        process.env.FRONTEND_PROD_URL, // Production (if set)
        'http://localhost:3000', // Fallback for local development
    ].filter(Boolean), // Remove empty values
    
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies and authorization headers
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'X-Requested-With',
        'Accept',
        'Origin'
    ], // Allowed request headers
    
    // Enable preflight for all routes
    optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// ===========================================
// MIDDLEWARE SETUP
// ===========================================
// Parse JSON request bodies
app.use(express.json({ limit: '10mb' })); // Increased limit for file uploads

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Development logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`📞 ${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
}

// ===========================================
// ROUTES SETUP
// ===========================================
// Register all application routes
routes.forEach(route => {
    console.log(`🛣️  Registering route: ${route.method.toUpperCase()} ${route.path}`);
    app[route.method](route.path, route.handler);
});

// Health check endpoint for development
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'AllEars Backend is running', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// ===========================================
// DATABASE CONNECTION & SERVER STARTUP
// ===========================================
// Connect to database and start server
getDbConnection(process.env.MONGODB_DB_NAME)
    .then(() => {
        console.log('🌍 Database connected successfully');
        
        // Start the server
        app.listen(PORT, () => {
            console.log('🚀 ================================');
            console.log('🚀 AllEars Backend Server Started');
            console.log('🚀 ================================');
            console.log(`📅 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 Server URL: http://localhost:${PORT}`);
            console.log(`🎯 Health Check: http://localhost:${PORT}/health`);
            console.log(`📊 Database: ${process.env.MONGODB_DB_NAME || 'allears'}`);
            console.log('🚀 ================================');
        });
    })
    .catch((error) => {
        console.error('❌ Failed to connect to database:', error);
        console.error('⚠️  Please make sure MongoDB is running');
        process.exit(1);
    });

