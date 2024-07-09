import express from 'express';
import serverless from 'serverless-http';
import router from '../../routes/index.js';
import cors from 'cors';

const app = express();

// Add CORS headers to allow everything
const corsOptions = {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware to handle JSON requests
app.use(express.json());

// Use the routes defined in the router
app.use('/api/v1', router);

// Export the handler
export const handler = serverless(app);
