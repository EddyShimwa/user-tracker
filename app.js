const express = require('express');
const app = express();

// ROUTES
app.get('/', (req, res) => {
    res.send('we are on home baby');
});

// Listen on port 3000
app.listen(3000);