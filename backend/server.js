const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors')
const connectDb = require('./bd/bd');
const { handleError } = require('./src/middleware/handleError');
const port = process.env.PORT || 5000
connectDb()
const App = express();

App.use(express.json())
App.use(express.urlencoded({extended:false}))
App.use('/api/goals', require('./src/routes/goalsRoutes'))
App.use(handleError)

App.listen(port, ()=>console.log(`server started on port ${port}`))