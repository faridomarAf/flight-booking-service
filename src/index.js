// basic server configuration is here
const express = require('express');
const {ServerConfig} = require('./config');
const apiRoutes = require('./routes')

const app = express();

//routes
app.use('/api', apiRoutes)


app.listen(ServerConfig.PORT, ()=>{
    console.log(`App is running on Port: ${ServerConfig.PORT}`);
})