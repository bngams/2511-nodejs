import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003; // from environment variable or default

app.get('/', (req, res) => {
    res.send(`Welcome to the ${process.env.APP_NAME} Server!?`);
});

app.get('/hello', (req, res) => {
    res.send('hello');
});

app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
});