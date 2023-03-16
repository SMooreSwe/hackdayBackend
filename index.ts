import express, { Request, Response } from 'express';
import { apiCaller } from './src/api';
import { createUser, deleteQuote, getOne, saveQuote } from './src/db';

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express()
const port = 8080;

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

//Quotes from API
app.get('/quotes', async (_req : Request, res: Response) => {
  const quote = await apiCaller();
    res
      .status(200)
      .json(quote.message)
})


//User DB
app.post('/users', jsonParser, async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await getOne(username, password);
  res
    .status(200)
    .json(user)
})

app.post('/users/new', jsonParser, async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await createUser(username, password);
  res.sendStatus(201);
});

app.put('/users/quotes', jsonParser, async (req: Request, res: Response) => {
  const id = req.body.id;
  const quote = req.body.quote;
  await saveQuote(id, quote)
  res.sendStatus(204)
})

app.delete('/users/quotes', jsonParser, async (req: Request, res: Response) => {
  const id = req.body.id;
  const quote = req.body.quote;
  await deleteQuote(id, quote)
  res.sendStatus(204)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})