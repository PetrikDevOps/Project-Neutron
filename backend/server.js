if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const db = require('./db');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {   
   res.sendFile(__dirname + '/public/index.html');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send('Login');
});


app.listen(port, () => {
   console.log(`Backend server is running on port ${port}`);
});