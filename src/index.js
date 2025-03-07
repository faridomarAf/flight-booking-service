// basic server configuration is here
const express = require('express');
const {ServerConfig} = require('./config');
const apiRoutes = require('./routes')
const Crons = require('./utils/common/cron-jobs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//routes
app.use('/api', apiRoutes)


app.listen(ServerConfig.PORT, ()=>{
    console.log(`App is running on Port: ${ServerConfig.PORT}`);
    Crons();
})