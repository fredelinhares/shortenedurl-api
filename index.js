const express = require('express');
const Database = require('@replit/database');
const db = new Database();
const app = express();
app.use(express.json());

let id = 0;  

async function clearDatabase() {
  const keys = await db.list();
  const promises = keys.map(key => db.delete(key));
  await Promise.all(promises);
  console.log('Database cleared');
}

app.post('/api/alias', async (req, res) => {
  const originalUrl = req.body.url;
  const idStr = id.toString(36);  
  await db.set(idStr, originalUrl);   
  const shortenedUrl = `${req.protocol}://${req.hostname}/${idStr}`;  
  id++;  
  res.send({
    alias: idStr,
    _links: {
      self: originalUrl,
      short: shortenedUrl
    }
  });
});

app.get('/:alias', async (req, res) => {
  const originalUrl = await db.get(req.params.alias);  
  if (originalUrl) {
    res.redirect(originalUrl);  
  } else {
    res.sendStatus(404);  
  }
});

app.post('/clear', async (req, res) => {
    await clearDatabase();
    res.sendStatus(200);
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
