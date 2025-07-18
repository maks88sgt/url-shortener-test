import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import shortUrlRoutes from './routes/shortUrl.routes.js';
import { setupSwagger } from './swagger.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use('/', shortUrlRoutes);

export default app;
