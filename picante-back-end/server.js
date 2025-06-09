require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("path");

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

// In production, serve React build
if (process.env.NODE_ENV === "production") {
  const root = path.join(__dirname, '../picante-front-end/dist');
  app.use(express.static(root));
  
    app.get(/.*/, (req, res) => {
    res.sendFile(path.join(root, 'index.html'));
  });
}

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
