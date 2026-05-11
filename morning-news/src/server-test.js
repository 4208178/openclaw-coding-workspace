const express = require('express');
const path = require('path');
const fs = require('fs');

const projectRoot = '/home/myuser/.openclaw/workspace-coding/morning-news';
const app = express();

app.get('/', (req, res) => {
  const filePath = path.join(projectRoot, 'public', 'index.html');
  const content = fs.readFileSync(filePath, 'utf8');
  res.send(content);
});

app.listen(3002, () => console.log('3002'));
