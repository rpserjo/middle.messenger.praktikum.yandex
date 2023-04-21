const express = require('express');

console.log('test');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./dist/'));

app.get(/(.*?)/, (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
    console.log(`app listening on port http://localhost:${PORT}!`);
});
