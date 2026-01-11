import express from 'express';

import {test_users} from './user-db'
const app = express();
const port = 3000;

test_users().then(
    () => console.log( 'Success'),
    () => console.log( 'Error'),
)


app.get('/', (req : express.Request, res : express.Response ) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});



