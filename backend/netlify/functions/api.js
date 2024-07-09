import Express from 'express';
import serverless from 'serverless-http';
import router from '../../routes/index.js'
import Cors from 'cors';

export async function handler(event, context) {
    const app = Express();
    // Add CORS headers to allow everything
    app.use(Cors());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); // Allows all domains
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    app.use(Express.json())
    app.use('/api/v1', router);
    return serverless(app)(event, context);
};

// Start it listening.
// app.listen(port, () => console.log(`Payments data app listening on port ${port}!`));