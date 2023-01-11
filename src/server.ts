import express from 'express';

import userRoutes from './handlers/userRoutes';
import categoryRoutes from './handlers/categoryRoutes';
import errorHandlerMiddleware from './middleware/error-handler';
import productRoutes from './handlers/productRoutes';
import orderRoutes from './handlers/orderRoutes';
import authRoutes from './handlers/authRoutes';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});

userRoutes(app);
categoryRoutes(app);
productRoutes(app);
orderRoutes(app);
authRoutes(app);

app.use(errorHandlerMiddleware);

export default app;
