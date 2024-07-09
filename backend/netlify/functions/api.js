import Express from 'express';
import serverless from 'serverless-http';
import router from '../../routes/index.js'
import cors from 'cors';

export async function handler(event, context) {
    const app = Express();
    // Add CORS headers to allow everything
    app.use(cors({
        origin: '*', // Allows all origins
        methods: 'GET,PUT,POST,DELETE,OPTIONS', // Allowed methods
        allowedHeaders: 'Content-Type,Authorization' // Allowed headers
    }));
    app.use(Express.json())
    app.use('/api/v1', router);
    return serverless(app)(event, context);
};

// Start it listening.
// app.listen(port, () => console.log(`Payments data app listening on port ${port}!`));