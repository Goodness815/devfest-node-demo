const express = require('express');
const app = express();

// Unique per container instance, so you can SEE autoscaling happen
const instanceId = Math.random().toString(36).slice(2, 8);
const startedAt = new Date().toISOString();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello Devfest! from Google Cloud Run',
    instance: instanceId,
    revision: process.env.K_REVISION || 'local',
    startedAt,
  });
});

// Burns a little CPU and holds the request open, so concurrent
// requests pile up and Cloud Run adds instances
app.get('/heavy', async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // 1. wait half a second
  let x = 0;
  for (let i = 0; i < 2e7; i++) x += Math.sqrt(i); // 2. burn CPU
  res.json({ instance: instanceId, done: true });  // 3. respond
});

// Cloud Run tells your app which port to use via PORT
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => console.log(`Listening on ${port}`));
