import express from 'express';
import userRoutes from './handlers/userRoutes';
import errorHandlerMiddleware from './middleware/error-handler';
// import { AuthService } from './services/Auth';
// const {ADMIN_PASSWORD} = process.env;

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(express.json());

app.listen(3000, function () {
  // console.log(AuthService.generateToken(ADMIN_PASSWORD as string))
  console.log(`starting app on: ${address}`);
});

userRoutes(app);
app.use(errorHandlerMiddleware);

export default app;
