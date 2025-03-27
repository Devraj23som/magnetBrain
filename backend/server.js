import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import  dotenv  from 'dotenv';
import taskRoutes from './routes/taskRoutes.js'
import cookieParser from 'cookie-parser';
// import mongoose from 'mongoose';
// import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
const app = express()
dotenv.config()
connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true,

  })
);
app.options('*', cors());

app.use(
  express.urlencoded({ extended: true })
);
app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res)=>{
    res.json('server is listening...')
  })
  app.use('/api/users', userRoutes) 
  app.use('/api/tasks', taskRoutes) 
  const PORT = 5000 || process.env.PORT

app.listen(PORT, ()=>{
  console.log(`server is running on port 5000`);
})
