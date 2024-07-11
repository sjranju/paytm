import express from 'express';
import serverless from 'serverless-http';
import router from '../../routes/index.js';
import cors from 'cors';

const app = express();

// Add CORS headers to allow everything
const corsOptions = {
    origin: 'https://payment-application.netlify.app/',
    credentials: true,
    preflightContinue: true,
    optionSuccessStatus: 200,
};

app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

// Handle preflight requests
// app.options('*', (req, res) => res.set(corsOptions).status(204).send())

// Middleware to handle JSON requests
app.use(express.json());

// Use the routes defined in the router
app.use('/api/', router);

// Export the handler
export const handler = serverless(app);
