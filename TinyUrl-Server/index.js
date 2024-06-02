import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from './database.js'

import UserRouter from './Routes/UserRouter.js'
import LinkRouter from './Routes/LinkRouter.js'
const port = process.env.PORT || 3000;
connectDB()
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
      res.send('hello 👏')
})
app.use('/users', UserRouter);
app.use('/links', LinkRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});