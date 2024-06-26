import express from 'express';
import serverless from 'serverless-http';
import router from '../../routes/index.js'
import Cors from 'cors';

export async function handler(event, context) {
    const app = express();
    // Add CORS headers to allow everything
    app.use(Cors());
    app.use(express.json())
    app.use('/api/v1', router);
    return serverless(app)(event, context);
};

// Start it listening.
// app.listen(port, () => console.log(`Payments data app listening on port ${port}!`));