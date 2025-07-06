import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import shortUrlRoutes from './routes/shortUrl.routes';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use('/', shortUrlRoutes);

export default app;
