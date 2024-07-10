import express from 'express';
import serverless from 'serverless-http';
import router from '../../routes/index.js';
import cors from 'cors';

const app = express();

// Add CORS headers to allow everything
const corsOptions = {
    origin: ['https://payment-application.netlify.app', 'http://localhost:5173/'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    preflightContinue: true,
    optionSuccessStatus: 200,
    allowedHeaders: [
        "Origin",
        "Content-Type",
        "Accept",
        "Authorization",
        "X-Request-With",
    ],
};

const HEADERS = {
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS, PATCH',
    'Access-Control-Allow-Origin': ['https://payment-application.netlify.app', 'http://localhost:5173/'],
    'Content-Type': 'application/json',
    'Access-Control-Max-Age': '86400',
    "Access-Control-Allow-Credentials": "true"
};

app.use(cors(corsOptions));

// Handle preflight requests
// app.options('*', (req, res) => res.set('headers', HEADERS).status(204).send())
app.options('*', cors(corsOptions))

// Middleware to handle JSON requests
app.use(express.json());

// Use the routes defined in the router
app.use('/api/v1', router);

// Export the handler
export const handler = serverless(app);
