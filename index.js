const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/alias', (req, res) => {
    const originalUrl = req.body.url;
    const shortenedUrl = originalUrl.substr(0, 5);
    res.send({
        alias: shortenedUrl,
        _links: {
            self: originalUrl,
            short: shortenedUrl
        }
    });
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
