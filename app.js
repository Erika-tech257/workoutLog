require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require ('./db');

const workout = require('./controllers/workoutcontroller'); //practice 
const user = require('./controllers/usercontroller');

sequelize.sync();

app.use(express.json());



app.use('/user', user);

app.use(require('./middleware/validate-session')); 
app.use('/workout', workout); //practice endpoint



app.listen(4000, function(){
    console.log('App listening on port 4000');
})