import express from 'express';
import serverless from 'serverless-http';
import router from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'https://payment-application.netlify.app',
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 204,
}));

app.use(express.json());

app.use('/api/', router);

app.use((err, req, res, next) => {
    console.log('In global error handler', { err })
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
})

// Export the handler
export const handler = serverless(app);
