const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roomTypesRoutes = require('./routes/roomTypesRoutes');
 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true} ).then(() => console.log("DB connected HMS")).catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/roomtypes', roomTypesRoutes);

app.get('/', (req, res) => {
    res.json("Welcome to Hotel management System")
});

app.listen(8000, () => {
    console.log('Server is running on port 8000')
});