const express = require('express');
const port = 3000;
const handlebar = require('express-handlebars');
const path = require('path');
const app = express();
const router = express.Router();
const db = require('./database/connection');


app.engine(
    'hbs',
    handlebar({
        extname: '.hbs'
    }),
);

app.set('view engine', 'handlebars');
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());


app.listen(port, () => {
    console.log(`Project http://localhost:${port}`)
});