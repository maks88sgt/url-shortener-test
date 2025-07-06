import app from './app.js';
import { AppDataSource } from './ormconfig.js';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error', err);
  });
