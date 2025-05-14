require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('PromptCraft Backend API is running.');
});

// Placeholder for prompt routes
// app.use('/api/prompts', require('./routes/prompts'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});