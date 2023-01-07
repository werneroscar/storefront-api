import express, { Request, Response } from 'express';
import { UserStore } from './models/User';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(express.json());

app.post('/', async function (req: Request, res: Response) {
  return res.json(await UserStore.create(req.body));
});

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
