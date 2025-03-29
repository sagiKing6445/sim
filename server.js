const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/newDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema and Model
const valuesSchema = new mongoose.Schema({
  value1: Number,
  value2: Number,
  value3: Number,
});
const Values = mongoose.model('Values', valuesSchema);

// Routes
app.post('/values', async (req, res) => {
  try {
    const { value1, value2, value3 } = req.body;
    const values = new Values({ value1, value2, value3 });
    await Values.deleteMany(); // Clear previous values
    await values.save();
    res.status(200).send('Values saved successfully');
  } catch (error) {
    console.error('Error saving values:', error);
    res.status(500).send('Error saving values');
  }
});

app.get('/values', async (req, res) => {
  try {
    const values = await Values.findOne();
    res.status(200).json(values || { value1: 0, value2: 0, value3: 0 });
  } catch (error) {
    console.error('Error fetching values:', error);
    res.status(500).send('Error fetching values');
  }
});

// Root route
app.get('/', (req, res) => {
  res.redirect('/values');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
