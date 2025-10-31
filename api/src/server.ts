import "dotenv/config";
import express from 'express';
import cors from 'cors';

import { routes } from './routes';
import { errorHandling } from './middlewares/error-handling';

const PORT = 3333;
const app = express();
app.use(cors({
  origin: '*', //
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(routes);
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Metrics avaiable in /metrics`);
  console.log(`❤️  Healthcheck in /health`);
});
