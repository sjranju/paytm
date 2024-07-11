import express from 'express';
import serverless from 'serverless-http';
import router from '../../routes/index.js';
import cors from 'cors';

const app = express();

// Add CORS headers to allow everything
const corsOptions = {
    origin: 'https://payment-application.netlify.app',
    credentials: true,
    preflightContinue: true
    // methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
    // allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    // optionsSuccessStatus: 204,
};

app.use(cors({
    origin: 'https://payment-application.netlify.app',
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 204,
}));

// Handle preflight requests
// app.options('*', (req, res) => {
//     res.set({
//         'Access-Control-Allow-Origin': 'https://payment-application.netlify.app',
//         'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS, PATCH',
//         'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//         'Access-Control-Allow-Credentials': 'true'
//     });
//     res.sendStatus(204);
// });
// app.options('*', cors(corsOptions))

// Middleware to handle JSON requests
app.use(express.json());

// Use the routes defined in the router
app.get('/123', (req, res) => {
    console.log('hahahahaah')
    return res.send({
        Heyyy: 'Whats up'
    })
});
app.use('/', router);

// Export the handler
export const handler = serverless(app);
