import 'dotenv/config';
import app from './app.js';
import { initDatabase } from './src/config/database.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Server running smoothly on http://localhost:${PORT}`);
  });
};

startServer();