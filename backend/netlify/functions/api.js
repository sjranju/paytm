import express from 'express';
import serverless from 'serverless-http';
import router from '../../routes/index.js';
import cors from 'cors';


export async function handler(event, context) {
    const app = express();

    // Add CORS headers to allow everything
    const corsOptions = {
        origin: 'https://payment-application.netlify.app',
        credentials: true,
        preflightContinue: true,
        optionSuccessStatus: 200,
    };

    // app.options('*', cors(corsOptions))
    // app.use(cors(corsOptions))
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "https://payment-application.netlify.app");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next()
    })
    // Handle preflight requests
    // app.options('*', (req, res) => res.set(corsOptions).status(204).send())

    // Middleware to handle JSON requests
    app.use(express.json());

    // Use the routes defined in the router
    app.use('/api/', router);
    return serverless(app)(event, context);
}
// Export the handler
