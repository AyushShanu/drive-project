const express = require('express');
const userRouter = require('./routes/user.route');
const app = express();
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
connectDB();
const indexRouter = require('./routes/index.route')



app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',indexRouter)
app.use('/user', userRouter);



app.listen(4000, () => {
    console.log('Server is running on port 4000');
});   