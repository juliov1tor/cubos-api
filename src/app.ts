import express from 'express';
import * as database from './config/database';
import accountRoutes from './routes/accountRoutes';
import authRoutes from './routes/authRoutes'; 

const basePatch = process.env.BASEPATCH || '/api'
const app = express();
// Middleware
app.use(express.json());

async function init() {
    await database.connect();
    routes();
    run();
}

function routes(): void {
    app.use(basePatch, accountRoutes);
    app.use(basePatch, authRoutes); 
}

function run(): void {
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);

        process.on('SIGINT', async () => {
            console.log('SIGINT signal received: closing HTTP server');
            database.disconnect();
            console.log('HTTP server closed');
            process.exit(0);
        });

    });
}
init()
