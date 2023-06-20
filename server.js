const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');


const app = express();
dotenv.config({path: 'config.env'});

const PORT = process.env.PORT || 8080;


// log requests

app.use(morgan('tiny'));

// parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}))

// set view engine
app.set("view engine", "ejs")

// load assets
app.use('/css', express.static(path.resolve(__dirname, 'asssets/css')))

app.get('/', (req, res) => {
    res.send('Hey node am back');
})

app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`)});