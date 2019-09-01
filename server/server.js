const express = require('express');
const path = require('path');  
const app = express();
const publicPath = path.join(__dirname, '..', 'dist');
const port = process.env.port || 3000;

app.use(express.static(publicPath));
app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: publicPath})
})
app.listen(port, () => {
    console.log("server is up")
})
